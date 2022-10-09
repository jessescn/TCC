import { ActorRepository } from 'repository/sequelize/actor'

export const makeActorRepository = () => {
  return new ActorRepository()
}
