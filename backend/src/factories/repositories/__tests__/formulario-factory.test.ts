import { FormularioRepository } from 'repositories/sequelize/formulario'
import { makeFormularioRepository } from '../formulario-factory'

describe('FormularioRepository Factory', () => {
  it('should create a instance of FormularioRepository', () => {
    const result = makeFormularioRepository()

    expect(result).toBeInstanceOf(FormularioRepository)
  })
})
