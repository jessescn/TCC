import { UserModel } from 'domain/models/user'
import { createMock } from 'ts-auto-mock'

export const baseSetup = (permissao: string) => {
  const user = createMock<UserModel>({
    permissoes: { [permissao]: 'all' }
  })

  const sendSpy = jest.fn()
  const jsonSpy = jest.fn()

  const response = {
    status: jest.fn().mockReturnValue({ send: sendSpy }),
    json: jsonSpy
  }

  return {
    response,
    spies: {
      sendSpy,
      jsonSpy
    },
    user
  }
}
