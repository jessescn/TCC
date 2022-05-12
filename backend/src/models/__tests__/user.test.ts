import User from '../user'
import bcrypt from 'bcrypt'

describe('Modelo User', () => {
  const sut = new User()

  test('validPassword: deve retornar que as senhas são as mesmas', async () => {
    const hash = await bcrypt.hash('password_teste', 10)

    sut.password = hash
    const result = await sut.validPassword('password_teste')
    expect(result).toBeTruthy()
  })

  test('validPassword: deve retornar que as senhas são distintas', async () => {
    const hash = await bcrypt.hash('password_teste', 10)

    sut.password = hash
    const result = await sut.validPassword('other_password')
    expect(result).toBeFalsy()
  })
})
