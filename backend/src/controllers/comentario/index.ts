import { CreateComentarioController } from 'controllers/comentario/create'
import { DeleteComentarioController } from './delete'
import { ReadComentarioController } from './read'
import { ReadOneComentarioController } from './read-one'
import { UpdateComentarioController } from './update'

export const createComentarioController = new CreateComentarioController()
export const deleteComentarioController = new DeleteComentarioController()
export const updateComentarioController = new UpdateComentarioController()
export const readComentarioController = new ReadComentarioController()
export const readOneComentarioController = new ReadOneComentarioController()
