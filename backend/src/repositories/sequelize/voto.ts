import Voto, { VotoAttributes, VotoModel } from 'domain/models/voto'
import { IRepository } from 'repositories'
import { InferAttributes, WhereOptions } from 'sequelize'

export type VotoQuery = WhereOptions<InferAttributes<VotoAttributes>>

export type NewVoto = {
  aprovado: boolean
  procedimentoId: number
}

export type CreateVoto = {
  aprovado: boolean
  autorId: number
  procedimentoId: number
}

export interface IVotoRepository extends IRepository {
  findOne: (id: number) => Promise<VotoModel>
  findAll: (query: VotoQuery, term?: string | null) => Promise<VotoModel[]>
  create: (data: CreateVoto) => Promise<VotoModel>
  update: (id: number, data: Partial<VotoModel>) => Promise<VotoModel>
  destroy: (id: number) => Promise<VotoModel>
  createOrUpdate: (data: CreateVoto) => Promise<VotoModel>
}

export class VotoRepository implements IVotoRepository {
  findAll = async (query: VotoQuery) => {
    const votos = await Voto.findAll({
      where: { ...query }
    })

    return votos
  }

  findOne = async (id: number) => {
    const voto = await Voto.findOne({
      where: { id }
    })

    return voto
  }

  create = async (data: CreateVoto) => {
    const newVoto = await Voto.create(data)

    return newVoto
  }

  update = async (id: number, data: Partial<VotoModel>) => {
    const voto = await Voto.findOne({ where: { id } })

    voto.set({ ...data })

    await voto.save()

    return voto
  }

  destroy = async (id: number) => {
    const voto = await this.findOne(id)

    await Voto.destroy({ where: { id: voto.id } })

    return voto
  }

  createOrUpdate = async (data: CreateVoto) => {
    const [voto] = await this.findAll({
      procedimentoId: data.procedimentoId,
      autorId: data.autorId
    })

    if (!voto) {
      return this.create(data)
    }

    voto.set({ aprovado: data.aprovado })

    await voto.save()

    return voto
  }
}
