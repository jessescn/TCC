import User, { UserModel } from 'models/user'
import { ConflictError, NotFoundError } from 'types/express/errors'
import bcrypt from 'bcrypt'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type RemoteUser = {
  nome: string
  email: string
  senha: string
  permissoes?: any
}

export const UserService = {
  getAll: async function (
    query: WhereOptions<InferAttributes<UserModel>> = {}
  ) {
    const resource = await User.findAll({ where: { deleted: false, ...query } })
    return resource
  },
  getById: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user || user.deleted) {
      throw new NotFoundError()
    }

    return user
  },

  getByEmail: async function (email: string) {
    const resource = await User.findOne({ where: { email } })
    return resource
  },

  create: async function (data: RemoteUser) {
    const emailAlreadyUsed = await this.getByEmail(data.email)

    if (emailAlreadyUsed) {
      throw new ConflictError()
    }

    const resource = await User.create(data)
    return resource
  },

  update: async function (id: number, data: any) {
    const user = await User.findByPk(id)

    if (!user || user.deleted) {
      throw new NotFoundError()
    }

    delete data.senha

    user.set({ ...data })

    await user.save()

    return user
  },
  destroy: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user || user.deleted) {
      throw new NotFoundError()
    }

    user.set({ deleted: true })

    await user.save()

    return user
  },
  validPassword: async function (password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted)
  }
}
