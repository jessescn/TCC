import { CreateComentarioController } from 'controllers/comentario/create'
import { DeleteComentarioController } from 'controllers/comentario/delete'
import { ReadComentarioController } from 'controllers/comentario/read'
import { ReadCommentsByProcedimentoController } from 'controllers/comentario/read-by-procedimento'
import { ReadOneComentarioController } from 'controllers/comentario/read-one'
import { UpdateComentarioController } from 'controllers/comentario/update'
import {
  createComentarioController,
  deleteComentarioController,
  readComentarioController,
  readCommentsByProcedimentoController,
  readOneComentarioController,
  updateComentarioController
} from '..'

describe('Comentario Controller Factories', () => {
  it('should create a instance of CreateComentarioController', () => {
    expect(createComentarioController).toBeInstanceOf(
      CreateComentarioController
    )
  })

  it('should create a instance of DeleteComentarioController', () => {
    expect(deleteComentarioController).toBeInstanceOf(
      DeleteComentarioController
    )
  })

  it('should create a instance of ReadCommentsByProcedimentoController', () => {
    expect(readCommentsByProcedimentoController).toBeInstanceOf(
      ReadCommentsByProcedimentoController
    )
  })

  it('should create a instance of ReadComentarioController', () => {
    expect(readComentarioController).toBeInstanceOf(ReadComentarioController)
  })

  it('should create a instance of ReadOneComentarioController', () => {
    expect(readOneComentarioController).toBeInstanceOf(
      ReadOneComentarioController
    )
  })

  it('should create a instance of UpdateComentarioController', () => {
    expect(updateComentarioController).toBeInstanceOf(
      UpdateComentarioController
    )
  })
})
