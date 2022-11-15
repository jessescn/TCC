import { makeActorRepository } from 'factories/repositories/actor-factory'
import { makeProfileRepository } from 'factories/repositories/profile-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { ActorService } from 'services/actor'

export const makeActorService = () => {
  return new ActorService(
    makeActorRepository(),
    makeProfileRepository(),
    makeTipoProcedimentoRepository()
  )
}
