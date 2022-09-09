import { UserAttributes } from 'models/user'
import { Roles } from 'types/auth/actors'

export class Usuario {
  static findByRole = (usuarios: UserAttributes[], role: Roles) => {
    return usuarios.filter(user => user.roles.includes(role))
  }

  static getPublicos = (usuarios: UserAttributes[]) => {
    const publicos = usuarios.reduce((publicos, user) => {
      return [...new Set([...publicos, ...user.publico])]
    }, [] as string[])

    return publicos
  }
}
