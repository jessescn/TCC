import { makeActorRepository } from 'factories/repositories/actor-factory'
import { EmAnaliseStatusHandler } from 'services/status/em-analise'

export const makeEmAnaliseStatusHandler = () => {
  return new EmAnaliseStatusHandler(makeActorRepository())
}
