import User from 'models/user'
import { ConflictError, NotFoundError } from 'types/express/errors'
import bcrypt from 'bcrypt'

export type RemoteUser = {
  nome: string
  email: string
  senha: string
}

export const UserService = {
  getAll: async function () {
    const resource = await User.findAll()
    return resource
  },
  getById: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user) {
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

    if (!user) {
      throw new NotFoundError()
    }

    delete data.senha

    user.set({ ...data })

    await user.save()

    return user
  },
  destroy: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user) {
      throw new NotFoundError()
    }

    user.destroy()

    return user
  },
  validPassword: async function (password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted)
  }
}
