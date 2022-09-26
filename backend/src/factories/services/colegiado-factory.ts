import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { ColegiadoService } from 'services/colegiado'

export const makeColegiadoService = () => {
  return new ColegiadoService(makeProcedimentoRepository())
}
