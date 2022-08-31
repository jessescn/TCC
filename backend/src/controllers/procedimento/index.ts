import { HomologateProcedimentoController } from './homologate'
import { CreateProcedimentoController } from './create'
import { ReadProcedimentoController } from './read'
import { ReadOneProcedimentoController } from './read-one'
import { UpdateProcedimentoController } from './update'
import { UpdateStatusProcedimentoController } from './update-status'
import { ReviewProcedimentoController } from './review'
import { DeleteProcedimentoController } from './delete'

export const createProcedimentoController = new CreateProcedimentoController()
export const readProcedimentoController = new ReadProcedimentoController()
export const readOneProcedimentoController = new ReadOneProcedimentoController()
export const updateProcedimentoController = new UpdateProcedimentoController()
export const deleteProcedimentoController = new DeleteProcedimentoController()
export const updateStatusProcedimentoController =
  new UpdateStatusProcedimentoController()
export const homologateProcedimentoController =
  new HomologateProcedimentoController()
export const reviewProcedimentoController = new ReviewProcedimentoController()
