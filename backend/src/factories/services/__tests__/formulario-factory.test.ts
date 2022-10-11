import { FormularioService } from 'services/formulario'
import { makeFormularioService } from '../formulario-factory'

describe('FormularioService Factory', () => {
  it('should create a instance of FormularioService', () => {
    const result = makeFormularioService()

    expect(result).toBeInstanceOf(FormularioService)
  })
})
