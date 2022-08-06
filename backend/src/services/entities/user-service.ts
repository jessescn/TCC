import User, { UserModel } from 'models/user'
import { ConflictError, NotFoundError } from 'types/express/errors'
import bcrypt from 'bcrypt'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { Roles } from 'types/auth/actors'

export type RemoteUser = {
  nome: string
  email: string
  senha: string
  permissoes?: any
  roles?: Roles[]
}

export type UserQuery = WhereOptions<InferAttributes<UserModel>>

export const UserService = {
  getAll: async function (query: UserQuery = {}) {
    const resource = await User.findAll({ where: { deleted: false, ...query } })
    return resource
  },
  getById: async function (id: number) {
    const user = await User.findOne({ where: { id, deleted: false } })

    if (!user) {
      throw new NotFoundError()
    }

    return user
  },
  getByRole: async function (role: Roles) {
    const users = await User.findAll()

    return users.filter(user => user.roles.includes(role))
  },
  getByEmail: async function (email: string) {
    const resource = await User.findOne({ where: { email } })
    return resource
  },

  create: async function (data: RemoteUser) {
    const resourceAlreadyCreated = await this.getByEmail(data.email)

    if (resourceAlreadyCreated) {
      throw new ConflictError()
    }

    const resource = await User.create(data)
    return resource
  },

  update: async function (id: number, data: any) {
    const resource = await User.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    delete data.senha

    resource.set({ ...data })

    await resource.save()

    return resource
  },
  destroy: async function (id: number) {
    const resource = await User.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ deleted: true })

    await resource.save()

    return resource
  },
  validPassword: async function (password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted)
  }
}
