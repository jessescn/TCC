import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'
import { ProcedimentoStatusService } from 'services/procedimento-status'

export const makeProcedimentoStatusService = () => {
  return new ProcedimentoStatusService(makeUsuarioRepository())
}
