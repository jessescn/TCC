import { CreateTipoProcedimentoController } from 'controllers/tipo-procedimento/create'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeCreateTipoProcedimentoController = () => {
  return new CreateTipoProcedimentoController(
    makeTipoProcedimentoRepository(),
    makeFormularioRepository()
  )
}
