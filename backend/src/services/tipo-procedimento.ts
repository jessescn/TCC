import { TipoProcedimentoHelper } from 'domain/helpers/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { Pagination } from 'repositories'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import { IProcedimentoRepo } from 'repositories/sequelize/procedimento'
import {
  ITipoProcedimentoRepository,
  NewTipoProcedimento,
  TipoProcedimentoQuery
} from 'repositories/sequelize/tipo-procedimento'
import { IService } from 'services'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { paginateList } from 'utils/value'

export type TipoProcedimentoDetails = {
  tipo: TipoProcedimentoModel
  formularios: FormularioModel[]
}

export interface ITipoProcedimentoService
  extends IService<TipoProcedimentoModel, TipoProcedimentoQuery> {
  create: (
    actor: ActorModel,
    data: NewTipoProcedimento
  ) => Promise<TipoProcedimentoModel>
  update: (
    id: number,
    data: Partial<TipoProcedimentoModel>
  ) => Promise<TipoProcedimentoModel>
  exportData: (id: number) => Promise<any>
  analyzableData: (
    id: number,
    formularioId: number,
    nomeCampo: string,
    filtros?: any
  ) => Promise<any>
}

export class TipoProcedimentoService implements ITipoProcedimentoService {
  constructor(
    private tipoProcedimentoRepo: ITipoProcedimentoRepository,
    private formularioRepo: IFormularioRepository,
    private procedimentoRepo: IProcedimentoRepo
  ) {}

  private async checkIfFormulariosExists(ids: number[]) {
    if (ids.length === 0) return

    const formularios = await this.formularioRepo.findAll({ id: ids })

    if (formularios.length !== ids.length) {
      throw new BadRequestError()
    }

    return formularios
  }

  private async checkIfTipoProcedimentoExists(
    id: number,
    query: TipoProcedimentoQuery = { deleted: false }
  ) {
    const [tipoProcedimento] = await this.tipoProcedimentoRepo.findAll({
      id,
      ...query
    })

    if (!tipoProcedimento) {
      throw new NotFoundError(`Tipo Procedimento ${id} não encontrado.`)
    }

    return tipoProcedimento
  }

  async create(actor: ActorModel, data: NewTipoProcedimento) {
    await this.checkIfFormulariosExists(data.formularios)

    const newTipoProcedimento = await this.tipoProcedimentoRepo.create({
      colegiado: data.colegiado,
      revisao_coordenacao: data.revisao_coordenacao,
      escopo: data.escopo,
      formularios: data.formularios,
      nome: data.nome,
      publicos: data.publicos,
      dataFim: data.dataFim,
      dataInicio: data.dataInicio,
      status: data.status || 'inativo',
      descricao: data.descricao,
      createdBy: actor.id
    })

    return newTipoProcedimento
  }

  async findOne(id: number) {
    return this.checkIfTipoProcedimentoExists(id)
  }

  async findAll(query: TipoProcedimentoQuery, pagination: Pagination) {
    const tipoProcedimentos = await this.tipoProcedimentoRepo.findAll(
      query,
      pagination.term
    )

    const paginated = paginateList(tipoProcedimentos, pagination)

    return {
      total: tipoProcedimentos.length,
      data: paginated
    }
  }

  async update(id: number, data: Partial<TipoProcedimentoModel>) {
    await this.checkIfTipoProcedimentoExists(id)

    return this.tipoProcedimentoRepo.update(id, data)
  }

  async delete(id: number) {
    await this.checkIfTipoProcedimentoExists(id)

    return this.tipoProcedimentoRepo.destroy(id)
  }

  async exportData(id: number) {
    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(id)
    const formularios = await this.checkIfFormulariosExists(
      tipoProcedimento.formularios
    )

    const procedimentos = await this.procedimentoRepo.findAll({
      tipo: id,
      deleted: false
    })

    const data = procedimentos
      .map(procedimento =>
        TipoProcedimentoHelper.getExportData(procedimento, formularios)
      )
      .filter(value => value.length > 0)

    return data
  }

  private applyFiltrosOnProcedimentos(
    procedimentos: ProcedimentoModel[],
    filtros: any = {}
  ) {
    let result = procedimentos.filter(procedimento => procedimento.createdAt)
    const dataInicio = filtros.dataInicio
    const dataFim = filtros.dataFim

    if (dataInicio && dataInicio !== '') {
      try {
        const dataInicioDate = new Date(dataInicio)

        result = result.filter(procedimento => {
          const dataProcedimento = new Date(procedimento.createdAt)

          return dataProcedimento >= dataInicioDate
        })
      } catch (error) {}
    }

    if (dataFim && dataFim !== '') {
      try {
        const dataFimDate = new Date(dataFim)

        result = result.filter(procedimento => {
          const dataProcedimento = new Date(procedimento.createdAt)

          return dataProcedimento < dataFimDate
        })
      } catch (error) {}
    }

    return result
  }

  async analyzableData(
    id: number,
    formularioId: number,
    nomeCampo: string,
    filtros: any
  ) {
    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(id)
    const formularios = await this.checkIfFormulariosExists(
      tipoProcedimento.formularios
    )

    const formulario = formularios.find(
      formulario => formulario.id === formularioId
    )

    if (!formulario) {
      throw new BadRequestError('Formulario não existe')
    }

    const campo = formulario.campos.find(
      value => value.configuracao_campo.titulo === nomeCampo
    )

    if (!nomeCampo || !campo) {
      throw new BadRequestError('Nome do campo inválido ou inexistente')
    }

    const procedimentos = await this.procedimentoRepo.findAll({
      tipo: id,
      deleted: false
    })

    const filteredProcedimentos = this.applyFiltrosOnProcedimentos(
      procedimentos,
      filtros
    )

    const dataList = filteredProcedimentos.reduce((current, procedimento) => {
      const result = TipoProcedimentoHelper.getAnalyzableData(
        procedimento,
        formulario,
        nomeCampo
      )

      if (Object.keys(result).length === 0) {
        return current
      }

      return [
        ...current,
        {
          procedimento: procedimento.id,
          date: procedimento.updatedAt,
          values: result
        }
      ]
    }, [])

    return {
      formulario,
      tipoProcedimento,
      data: dataList
    }
  }
}
