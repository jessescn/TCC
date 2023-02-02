import bcrypt from 'bcrypt'
import { encryptPassword, validatePassword } from 'utils/password'

describe('Password utils Tests', () => {
  describe('validatePassword', () => {
    const sut = validatePassword
    const encrypted = bcrypt.hashSync('banana', 2)

    it('should return if password and the encrypted password are the same', async () => {
      const results = await Promise.all([
        sut('banana', encrypted),
        sut('apple', encrypted)
      ])

      expect(results[0]).toBeTruthy()
      expect(results[1]).toBeFalsy()
    })
  })

  describe('encryptPassword', () => {
    const sut = encryptPassword
    it('should encrypt an password', async () => {
      const result = await sut('teste')

      const isSame = await bcrypt.compare('teste', result)

      expect(isSame).toBeTruthy()
    })
  })
})
