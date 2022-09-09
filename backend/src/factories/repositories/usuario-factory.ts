import { UsuarioRepository } from 'repository/sequelize/usuario'

export const makeUsuarioRepository = () => {
  return new UsuarioRepository()
}
