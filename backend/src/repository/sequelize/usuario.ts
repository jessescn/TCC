import User, { UserAttributes, UserModel } from 'models/user'
import { IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { Roles } from 'types/auth/actors'

export type UsuarioQuery = WhereOptions<InferAttributes<UserAttributes>>

export type CreateUsuario = {
  nome: string
  email: string
  senha: string
  permissoes?: any
  roles?: Roles[]
}

export class UsuarioRepository implements IRepository {
  findAll = async (query: UsuarioQuery = {}) => {
    return User.findAll({ where: { deleted: false, ...query } })
  }

  findOne = async (id: number) => {
    return User.findOne({ where: { id, deleted: false } })
  }

  create = async (data: CreateUsuario) => {
    return User.create(data)
  }

  update = async (id: number, data: Partial<UserModel>) => {
    const usuario = await this.findOne(id)

    usuario.set({ ...data })

    await usuario.save()

    return usuario
  }

  destroy = async (id: number) => {
    const usuario = await this.findOne(id)

    usuario.set({ deleted: true })

    await usuario.save()

    return usuario
  }
}
