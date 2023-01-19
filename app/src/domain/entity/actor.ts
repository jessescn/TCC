import { ProfileType, UserModel } from 'domain/models/user'

export class Actor {
  static includesInProfiles(user: UserModel, profiles: ProfileType[]) {
    const userProfile = user.profile.nome

    return profiles.includes(userProfile)
  }

  static includesInPublicos(user: UserModel, publicos: string[]) {
    if (publicos.length === 0) return true

    const userPublicos = user.publico

    const intersection = userPublicos.filter(publico =>
      publicos.includes(publico)
    )

    return intersection.length > 0
  }
}
