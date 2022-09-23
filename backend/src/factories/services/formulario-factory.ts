import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { FormularioService } from 'services/formulario'

export const makeFormularioService = () => {
  return new FormularioService(makeFormularioRepository())
}
