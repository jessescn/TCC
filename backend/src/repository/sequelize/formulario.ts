import Formulario, {
  CampoFormulario,
  FormularioAttributes,
  FormularioModel
} from 'models/formulario'
import User from 'models/user'
import { includeableUser, IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type FormularioQuery = WhereOptions<
  InferAttributes<FormularioAttributes>
>

export type CreateFormulario = {
  nome: string
  campos: CampoFormulario[]
  descricao?: string
  createdBy: number
}

export class FormularioRepository implements IRepository {
  findAll = async (query: FormularioQuery = {}) => {
    const formularios = await Formulario.findAll({
      include: [includeableUser],
      where: { deleted: false, ...query }
    })
    return formularios
  }

  findOne = async (id: number) => {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: [includeableUser]
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    return formulario
  }

  create = async (data: CreateFormulario) => {
    const newFormulario = await Formulario.create(data, { include: [User] })
    return newFormulario
  }

  update = async (id: number, data: Partial<FormularioModel>) => {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: [includeableUser]
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    formulario.set({ ...data })

    await formulario.save()

    return formulario
  }

  destroy = async (id: number) => {
    const formulario = await Formulario.findOne({
      where: { id, deleted: false },
      include: [includeableUser]
    })

    if (!formulario) {
      throw new NotFoundError()
    }

    formulario.set({ deleted: true })

    await formulario.save()

    return formulario
  }
}
