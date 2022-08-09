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

export const UsuarioService = {
  getAll: async function (query: UserQuery = {}) {
    const usuarios = await User.findAll({ where: { deleted: false, ...query } })
    return usuarios
  },
  getById: async function (id: number) {
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    return usuario
  },
  getByRole: async function (role: Roles) {
    const usuarios = await User.findAll()

    return usuarios.filter(user => user.roles.includes(role))
  },
  getAllPublicos: async function () {
    const usuarios = await User.findAll()

    const publicos = usuarios.reduce((publicos, user) => {
      const nonDuplicate = [...new Set([...publicos, ...user.publico])]

      return nonDuplicate
    }, [] as string[])

    return publicos
  },
  getByEmail: async function (email: string) {
    const usuario = await User.findOne({ where: { email } })
    return usuario
  },
  create: async function (data: RemoteUser) {
    const usuario = await this.getByEmail(data.email)

    if (usuario) {
      throw new ConflictError()
    }

    const newUsuario = await User.create(data)
    return newUsuario
  },
  update: async function (id: number, data: any) {
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    delete data.senha

    usuario.set({ ...data })

    await usuario.save()

    return usuario
  },
  destroy: async function (id: number) {
    const usuario = await User.findOne({ where: { id, deleted: false } })

    if (!usuario) {
      throw new NotFoundError()
    }

    usuario.set({ deleted: true })

    await usuario.save()

    return usuario
  },
  validPassword: async function (password: string, encrypted: string) {
    return bcrypt.compare(password, encrypted)
  }
}
