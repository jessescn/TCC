import User, { UserAttributes, UserModel } from 'models/user'
import { IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { Roles } from 'types/auth/actors'
import { ConflictError, NotFoundError } from 'types/express/errors'

export type UsuarioQuery = WhereOptions<InferAttributes<UserAttributes>>

export type RemoteNewUsuario = {
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
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    return usuario
  }

  create = async (data: RemoteNewUsuario) => {
    const usuario = await User.findOne({ where: { email: data.email } })

    if (usuario) {
      throw new ConflictError()
    }

    const newUsuario = await User.create(data)

    return newUsuario
  }

  update = async (id: number, data: Partial<UserModel>) => {
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    delete data.senha

    usuario.set({ ...data })

    await usuario.save()

    return usuario
  }

  destroy = async (id: number) => {
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    usuario.set({ deleted: true })

    await usuario.save()

    return usuario
  }
}
