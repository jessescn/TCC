import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { EncaminhadoStatusHandler } from 'services/status/encaminhado'
import { makeActorRepository } from 'factories/repositories/actor-factory'

export const makeEncaminhadoStatusHandler = () => {
  return new EncaminhadoStatusHandler(
    makeFormularioRepository(),
    makeTipoProcedimentoRepository(),
    makeActorRepository()
  )
}
