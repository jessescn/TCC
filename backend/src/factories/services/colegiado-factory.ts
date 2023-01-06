import { makeActorRepository } from 'factories/repositories/actor-factory'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { makeVotoRepository } from 'factories/repositories/voto-factory'
import { ColegiadoService } from 'services/colegiado'
import { makeProcedimentoStatusService } from './procedimento-status-factory'

export const makeColegiadoService = () => {
  return new ColegiadoService(
    makeProcedimentoRepository(),
    makeProcedimentoStatusService(),
    makeActorRepository(),
    makeVotoRepository()
  )
}
