import User from 'models/user'
import { UserModel } from 'types/user'
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
    const resource = await User.findByPk(id)
    return resource
  },

  getByEmail: async function (email: string) {
    const resource = await User.findOne({ where: { email } })
    return resource
  },

  create: async function (data: RemoteUser) {
    const resource = await User.create(data)
    return resource
  },

  update: async function (id: number, data: UserModel) {
    const user = await this.getById(id)

    if (!user) return null

    delete data.password

    user.set({ ...data })

    await user.save()

    return user
  },
  destroy: async function (id: number) {
    const user = await this.getById(id)

    if (!user) return null

    user.destroy()

    return user
  }
}
