import Profile, { ProfileAttributes, ProfileModel } from 'domain/models/profile'
import { Permissions } from 'domain/profiles'
import { IRepository } from 'repositories'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type ProfileQuery = WhereOptions<InferAttributes<ProfileAttributes>>

export type CreateProfile = {
  nome: string
  permissoes: Permissions
}

export interface IProfileRepository extends IRepository {
  findOne: (id: number) => Promise<ProfileAttributes>
  findAll: (
    query?: ProfileQuery,
    term?: string | null
  ) => Promise<ProfileAttributes[]>
  create: (data: CreateProfile) => Promise<ProfileAttributes>
  update: (
    id: number,
    data: Partial<ProfileModel>
  ) => Promise<ProfileAttributes>
  destroy: (id: number) => Promise<ProfileAttributes>
}

export class ProfileRepository implements IProfileRepository {
  findAll = async (query: ProfileQuery = {}) => {
    return Profile.findAll({ where: { deleted: false, ...query } })
  }

  findOne = async (id: number) => {
    return Profile.findOne({ where: { id, deleted: false } })
  }

  create = async (data: CreateProfile) => {
    return Profile.create({
      nome: data.nome,
      permissoes: data.permissoes
    })
  }

  update = async (id: number, data: Partial<ProfileModel>) => {
    const profile = await this.findOne(id)

    profile.set({ ...data })

    await profile.save()

    return profile
  }

  destroy = async (id: number) => {
    const profile = await this.findOne(id)

    profile.set({ deleted: true })

    await profile.save()

    return profile
  }
}
