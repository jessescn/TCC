import { makeCreateProcedimentoController } from './create-factory'
import { makeDeleteProcedimentoController } from './delete-factory'
import { makeGetDetailsProcedimentoController } from './details-factory'
import { makeHomologateProcedimentoController } from './homologate-factory'
import { makeReadActorProcedimentoController } from './read-actor-factory'
import { makeReadProcedimentoController } from './read-factory'
import { makeReadOneProcedimentoController } from './read-one-factory'
import { makeReviewProcedimentoController } from './review-factory'
import { makeUpdateProcedimentoController } from './update-factory'
import { makeUpdateStatusProcedimentoController } from './update-status-factory'

export const createProcedimentoController = makeCreateProcedimentoController()
export const readProcedimentoController = makeReadProcedimentoController()
export const readOneProcedimentoController = makeReadOneProcedimentoController()
export const updateProcedimentoController = makeUpdateProcedimentoController()
export const deleteProcedimentoController = makeDeleteProcedimentoController()
export const updateStatusProcedimentoController =
  makeUpdateStatusProcedimentoController()
export const homologateProcedimentoController =
  makeHomologateProcedimentoController()
export const reviewProcedimentoController = makeReviewProcedimentoController()
export const readActorProcedimentoController =
  makeReadActorProcedimentoController()
export const getDetailsProcedimentoController =
  makeGetDetailsProcedimentoController()
