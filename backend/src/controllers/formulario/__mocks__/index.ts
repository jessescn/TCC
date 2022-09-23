import { FormularioModel } from 'models/formulario'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'

export const bootstrap = (permissao: string) => {
  const formulario = createMock<FormularioModel>()

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
    user,
    response,
    spies: {
      sendSpy,
      jsonSpy
    },
    formulario
  }
}
