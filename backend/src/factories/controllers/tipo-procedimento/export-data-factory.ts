import { ExportDataController } from 'controllers/tipo-procedimento/export-data'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeExportDataController = () => {
  return new ExportDataController(makeTipoProcedimentoService())
}
