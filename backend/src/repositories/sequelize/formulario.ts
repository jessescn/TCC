import Actor from 'domain/models/actor'
import Formulario, {
  CampoFormulario,
  FormularioAttributes,
  FormularioModel
} from 'domain/models/formulario'
import { IRepository } from 'repositories'
import { InferAttributes, Op, WhereOptions } from 'sequelize'
import { isNumber } from 'utils/value'

export type FormularioQuery = WhereOptions<
  InferAttributes<FormularioAttributes>
>
export type NewFormulario = {
  nome: string
  descricao?: string
  template?: string
  campos: CampoFormulario[]
}

export type CreateFormulario = NewFormulario & {
  createdBy: number
}

export interface IFormularioRepository extends IRepository {
  findOne: (id: number) => Promise<FormularioModel>
  findAll: (
    query: FormularioQuery,
    term?: string | null
  ) => Promise<FormularioModel[]>
  create: (data: CreateFormulario) => Promise<FormularioModel>
  update: (
    id: number,
    data: Partial<FormularioModel>
  ) => Promise<FormularioModel>
  destroy: (id: number) => Promise<FormularioModel>
}

export class FormularioRepository implements IFormularioRepository {
  findAll = async (query: FormularioQuery = {}, term?: string) => {
    const searchId = isNumber(term) ? { id: { [Op.eq]: term } } : {}
    const search = term
      ? {
          [Op.or]: [{ nome: { [Op.iLike]: '%' + term + '%' } }, { ...searchId }]
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
      where: { id, deleted: false },
      include: [
        {
          model: Actor,
          attributes: ['nome']
        }
      ]
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
