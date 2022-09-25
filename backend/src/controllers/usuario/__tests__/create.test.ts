import { baseSetup } from 'controllers/__mocks__'

import { UserModel } from 'models/user'
import { NewUsuario } from 'repository/sequelize/usuario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateUsuarioController } from '../create'

describe('CreateUsuario Controller', () => {
  const usuario = createMock<UserModel>()
  const { user, response, spies } = baseSetup('user_create')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new CreateUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should create a new usuario', async () => {
    const data = createMock<NewUsuario>()
    const request = createMock<Request>({ user, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(data)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if request body does not contains some mandatory field', async () => {
    const data = { email: 'test@teste.com', nome: 'test' }
    const request = createMock<Request>({ user, body: data })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })

  it('should respond with BadRequest if request body contains some invalid role', async () => {
    const data = createMock<NewUsuario>({ roles: ['randomRole' as any] })
    const request = createMock<Request>({ user, body: data })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
