import { FormularioRepository } from 'repositories/sequelize/formulario'

export const makeFormularioRepository = () => {
  return new FormularioRepository()
}
