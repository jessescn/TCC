import { CreateTipoProcedimentoController } from './create'
import { DeleteTipoProcedimentoController } from './delete'
import { ReadTipoProcedimentoController } from './read'
import { ReadOneTipoProcedimentoController } from './read-one'
import { UpdateTipoProcedimentoController } from './update'

export const createTipoProcedimentoController =
  new CreateTipoProcedimentoController()
export const updateTipoProcedimentoController =
  new UpdateTipoProcedimentoController()
export const deleteTipoProcedimentoController =
  new DeleteTipoProcedimentoController()
export const readTipoProcedimentoController =
  new ReadTipoProcedimentoController()
export const readOneTipoProcedimentoController =
  new ReadOneTipoProcedimentoController()
