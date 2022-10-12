import { ReadProfileController } from 'controllers/profile/read'
import { makeProfileService } from 'factories/services/profile-factory'

export const makeReadProfileController = () => {
  return new ReadProfileController(makeProfileService())
}
