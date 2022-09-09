import { CreateProcedimentoController } from 'controllers/procedimento/create'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeCreateProcedimentoController = () => {
  return new CreateProcedimentoController(
    makeProcedimentoRepository(),
    makeTipoProcedimentoRepository(),
    makeUsuarioRepository()
  )
}
