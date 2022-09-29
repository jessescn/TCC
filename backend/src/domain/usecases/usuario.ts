import { UserModel } from 'domain/models/user'
import { Roles } from 'types/auth/actors'

export class UsuarioUseCase {
  static filterByRole(usuarios: UserModel[], role: Roles) {
    return usuarios.filter(user => user.roles.includes(role))
  }

  static getPublicos(usuarios: UserModel[]) {
    const publicos = usuarios.reduce((publicos, user) => {
      return [...new Set([...publicos, ...user.publico])]
    }, [] as string[])

    return publicos
  }
}
