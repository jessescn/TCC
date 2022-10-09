import Actor, { ActorAttributes, ActorModel } from 'domain/models/actor'
import { IRepository } from 'repository'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type ActorQuery = WhereOptions<InferAttributes<ActorAttributes>>

export type CreateActor = {
  nome: string
  email: string
  senha: string
  profile: number
}

export type NewActor = CreateActor

export class ActorRepository implements IRepository {
  findAll = async (query: ActorQuery = {}) => {
    return Actor.findAll({ where: { deleted: false, ...query } })
  }

  findOne = async (id: number) => {
    return Actor.findOne({ where: { id, deleted: false } })
  }

  create = async (data: CreateActor) => {
    return Actor.create(data)
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
