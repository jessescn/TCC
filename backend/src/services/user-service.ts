import User from 'models/user'
import { ConflictError, NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type RemoteUser = {
  name: string
  email: string
  password: string
}

export type TUserService = BaseService<User> & {
  getByEmail: (email: string) => Promise<User | null>
}

export const UserService: TUserService = {
  getAll: async function () {
    const resource = await User.findAll()
    return resource
  },
  getById: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user) {
      throw new NotFoundError('user not found')
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
      throw new ConflictError('user already exists')
    }

    const resource = await User.create(data)
    return resource
  },

  update: async function (id: number, data: any) {
    const user = await User.findByPk(id)

    if (!user) {
      throw new NotFoundError('user not found')
    }

    delete data.password

    user.set({ ...data })

    await user.save()

    return user
  },
  destroy: async function (id: number) {
    const user = await User.findByPk(id)

    if (!user) {
      throw new NotFoundError('user not found')
    }

    user.destroy()

    return user
  }
}
