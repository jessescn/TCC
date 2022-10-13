import Profile, { ProfileAttributes, ProfileModel } from 'domain/models/profile'
import { Permissions } from 'domain/profiles'
import { IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type ProfileQuery = WhereOptions<InferAttributes<ProfileAttributes>>

export type CreateProfile = {
  nome: string
  permissoes: Permissions
}

export class ProfileRepository implements IRepository {
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
