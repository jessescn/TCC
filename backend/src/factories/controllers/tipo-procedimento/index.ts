import { makeAnalyzableDataController } from './analyzable-data-factory'
import { makeCreateTipoProcedimentoController } from './create-factory'
import { makeDeleteTipoProcedimentoController } from './delete-factory'
import { makeExportDataController } from './export-data-factory'
import { makeReadTipoProcedimentoController } from './read-factory'
import { makeReadOneTipoProcedimentoController } from './read-one-factory'
import { makeUpdateTipoProcedimentoController } from './update-factory'

export const createTipoProcedimentoController =
  makeCreateTipoProcedimentoController()
export const updateTipoProcedimentoController =
  makeUpdateTipoProcedimentoController()
export const deleteTipoProcedimentoController =
  makeDeleteTipoProcedimentoController()
export const readTipoProcedimentoController =
  makeReadTipoProcedimentoController()
export const readOneTipoProcedimentoController =
  makeReadOneTipoProcedimentoController()
export const exportDataController = makeExportDataController()
export const analyzableDataController = makeAnalyzableDataController()
