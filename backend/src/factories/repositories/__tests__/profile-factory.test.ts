import { ProfileRepository } from 'repositories/sequelize/profile'
import { makeProfileRepository } from '../profile-factory'

describe('ProfileRepository Factory', () => {
  it('should create a instance of ProfileRepository', () => {
    const result = makeProfileRepository()

    expect(result).toBeInstanceOf(ProfileRepository)
  })
})
