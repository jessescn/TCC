import { ProfileService } from 'services/profile'
import { makeProfileService } from '../profile-factory'

describe('ProfileService Factory', () => {
  it('should create a instance of ProfileService', () => {
    const result = makeProfileService()

    expect(result).toBeInstanceOf(ProfileService)
  })
})
