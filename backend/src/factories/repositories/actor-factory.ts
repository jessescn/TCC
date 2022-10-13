import { ActorRepository } from 'repositories/sequelize/actor'

export const makeActorRepository = () => {
  return new ActorRepository()
}
