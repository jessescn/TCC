import { ExportPreviewController } from 'controllers/procedimento/export-preview'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeExportPreviewController = () => {
  return new ExportPreviewController(makeProcedimentoService())
}
