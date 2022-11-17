import Actor, { ActorAttributes, ActorModel } from 'domain/models/actor'
import Profile from 'domain/models/profile'
import { IRepository } from 'repositories'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type ActorQuery = WhereOptions<InferAttributes<ActorAttributes>>

export type CreateActor = {
  nome: string
  email: string
  senha: string
  profile: number
}

export type NewActor = {
  nome: string
  email: string
  senha: string
}

export const InclusivableActorOptions = {
  attributes: { exclude: ['profileId', 'permissoes'] },
  include: [Profile]
}

export class ActorRepository implements IRepository {
  findAll = async (query: ActorQuery = {}) => {
    return Actor.findAll({
      where: { deleted: false, ...query },
      ...InclusivableActorOptions
    })
  }

  findOne = async (id: number) => {
    return Actor.findOne({
      where: { id, deleted: false },
      ...InclusivableActorOptions
    })
  }

  create = async (data: CreateActor) => {
    const { id } = await Actor.create({ ...data, permissoes: data.profile })

    return this.findOne(id)
  }

  update = async (id: number, data: Partial<ActorModel>) => {
    const actor = await this.findOne(id)

    actor.set({ ...data })

    await actor.save()

    return actor
  }

  destroy = async (id: number) => {
    const actor = await this.findOne(id)

    actor.set({ deleted: true })

    await actor.save()

    return actor
  }
}
