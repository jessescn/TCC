import { FormularioRepository } from 'repository/sequelize/formulario'

export const makeFormularioRepository = () => {
  return new FormularioRepository()
}
