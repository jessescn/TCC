import { ReadProfileController } from 'controllers/profile/read'
import { readProfileController } from '..'

describe('Profile Controller Factories', () => {
  it('should create a instance of ReadProfileController', () => {
    expect(readProfileController).toBeInstanceOf(ReadProfileController)
  })
})
