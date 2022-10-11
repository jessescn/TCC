import { ComentarioRepository } from 'repository/sequelize/comentario'
import { makeComentarioRepository } from '../comentario-factory'

describe('ComentarioRepository Factory', () => {
  it('should create a instance of ComentarioRepository', () => {
    const result = makeComentarioRepository()

    expect(result).toBeInstanceOf(ComentarioRepository)
  })
})
