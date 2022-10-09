import { makeActorRepository } from 'factories/repositories/actor-factory'
import { ProcedimentoStatusService } from 'services/procedimento-status'

export const makeProcedimentoStatusService = () => {
  return new ProcedimentoStatusService(makeActorRepository())
}
