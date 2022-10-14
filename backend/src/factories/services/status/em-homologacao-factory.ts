import { makeActorRepository } from 'factories/repositories/actor-factory'
import { EmHomologacaoStatusHandler } from 'services/status/em-homologacao'

export const makeEmHomologacaoStatusHandler = () => {
  return new EmHomologacaoStatusHandler(makeActorRepository())
}
