import { ComentarioModel } from 'models/comentario'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'

export const bootstrap = (permissao: string) => {
  const comentario = createMock<ComentarioModel>({ user: { id: 2 } })

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
    user,
    comentario
  }
}
