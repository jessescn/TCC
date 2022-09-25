import { baseSetup } from 'controllers/__mocks__'
import { UserModel } from 'domain/models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadOneUsuarioController } from '../read-one'

describe('ReadOneUsuario Controller', () => {
  const usuario = createMock<UserModel>()
  const { user, response, spies } = baseSetup('user_read')

  const makeSut = () => {
    const service = {
      findOne: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new ReadOneUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should find an existing usuario by id', async () => {
    const request = createMock<Request>({ user, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if does not contains id on params', async () => {
    const request = createMock<Request>({ user })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
