import { UserModel } from 'domain/models/user'
import { ProfileType } from 'domain/types/actors'

export class User {
  static includesInProfiles(user: UserModel, profiles: ProfileType[]) {
    const userProfile = user.profile.nome

    return profiles.includes(userProfile)
  }
}
