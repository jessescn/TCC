import { baseSetup } from 'controllers/__mocks__'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteUsuarioController } from '../delete'

describe('DeleteUsuario Controller', () => {
  const usuario = createMock<UserModel>()
  const { user, response, spies } = baseSetup('user_delete')

  const makeSut = () => {
    const service = {
      delete: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new DeleteUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should delete an existing usuario', async () => {
    const request = createMock<Request>({ user, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if does not contains id on params', async () => {
    const request = createMock<Request>({ user })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
