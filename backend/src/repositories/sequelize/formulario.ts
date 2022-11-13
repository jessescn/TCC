import Actor from 'domain/models/actor'
import Formulario, {
  CampoFormulario,
  FormularioAttributes,
  FormularioModel
} from 'domain/models/formulario'
import { IRepository, Pagination } from 'repositories'
import { InferAttributes, Op, WhereOptions } from 'sequelize'
import { isNumber } from 'utils/value'

export type FormularioQuery = WhereOptions<
  InferAttributes<FormularioAttributes>
>

export type CreateFormulario = {
  nome: string
  campos: CampoFormulario[]
  descricao?: string
  createdBy: number
}

export type NewFormulario = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

export class FormularioRepository implements IRepository {
  findAll = async (query: FormularioQuery, pagination: Pagination) => {
    const searchId = isNumber(pagination.term)
      ? { id: { [Op.eq]: pagination.term } }
      : {}
    const search = pagination.term
      ? {
          [Op.or]: [
            { nome: { [Op.substring]: '%' + pagination.term + '%' } },
            { ...searchId }
          ]
        }
      : {}

    const formularios = await Formulario.findAll({
      where: { ...query, ...search },
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Actor,
          attributes: ['nome']
        }
      ]
    })

    return formularios
  }

  findOne = async (id: number) => {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false }
    })

    return formulario
  }

  create = async (data: CreateFormulario) => {
    const { id } = await Formulario.create(data)

    return this.findOne(id)
  }

  update = async (id: number, data: Partial<FormularioModel>) => {
    const formulario = await this.findOne(id)

    formulario.set({ ...data })

    await formulario.save()

    return formulario
  }

  destroy = async (id: number) => {
    const formulario = await this.findOne(id)

    formulario.set({ deleted: true })

    await formulario.save()

    return formulario
  }
}
