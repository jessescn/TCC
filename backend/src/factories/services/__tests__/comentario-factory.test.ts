import { ComentarioService } from 'services/comentario'
import { makeComentarioService } from '../comentario-factory'

describe('ComentarioService Factory', () => {
  it('should create a instance of ComentarioService', () => {
    const result = makeComentarioService()

    expect(result).toBeInstanceOf(ComentarioService)
  })
})
