import { makeActorRepository } from 'factories/repositories/actor-factory'
import { DeferidoStatusHandler } from 'services/status/deferido'

export const makeDeferidoStatusHandler = () => {
  return new DeferidoStatusHandler(makeActorRepository())
}
