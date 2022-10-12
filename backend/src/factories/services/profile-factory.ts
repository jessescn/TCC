import { makeProfileRepository } from 'factories/repositories/profile-factory'
import { ProfileService } from 'services/profile'

export const makeProfileService = () => {
  return new ProfileService(makeProfileRepository())
}
