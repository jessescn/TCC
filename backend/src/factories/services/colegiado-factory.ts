import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { ColegiadoService } from 'services/colegiado'
import { makeProcedimentoStatusService } from './procedimento-status-factory'

export const makeColegiadoService = () => {
  return new ColegiadoService(
    makeProcedimentoRepository(),
    makeProcedimentoStatusService()
  )
}
