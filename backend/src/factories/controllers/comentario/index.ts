import { makeCreateComentarioController } from 'factories/controllers/comentario/create-factory'
import { makeDeleteComentarioController } from 'factories/controllers/comentario/delete-factory'
import { makeReadByProcedimentoController } from 'factories/controllers/comentario/read-by-procedimento-factory'
import { makeReadComentarioController } from 'factories/controllers/comentario/read-factory'
import { makeReadOneComentarioController } from 'factories/controllers/comentario/read-one-factory'
import { makeUpdateComentarioController } from 'factories/controllers/comentario/update-factory'

export const createComentarioController = makeCreateComentarioController()
export const deleteComentarioController = makeDeleteComentarioController()
export const updateComentarioController = makeUpdateComentarioController()
export const readComentarioController = makeReadComentarioController()
export const readOneComentarioController = makeReadOneComentarioController()
export const readCommentsByProcedimentoController =
  makeReadByProcedimentoController()
