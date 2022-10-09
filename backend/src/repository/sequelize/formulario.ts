import Formulario, {
  CampoFormulario,
  FormularioAttributes,
  FormularioModel
} from 'domain/models/formulario'
import User from 'domain/models/actor'
import { includeableUser, IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'

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

    return formulario
  }

  create = async (data: CreateFormulario) => {
    const newFormulario = await Formulario.create(data, { include: [User] })

    return newFormulario
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
