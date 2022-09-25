import { baseSetup } from 'controllers/__mocks__'

import { UserModel } from 'models/user'
import { NewUsuario } from 'repository/sequelize/usuario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateUsuarioController } from '../update'

describe('UpdateUsuario Controller', () => {
  const usuario = createMock<UserModel>()
  const { user, response, spies } = baseSetup('user_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new UpdateUsuarioController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing usuario', async () => {
    const data: Partial<UserModel> = { nome: 'new name' }
    const request = createMock<Request>({
      user,
      params: { id: '1' },
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if request body contains invalid update field', async () => {
    const data: Partial<UserModel> = { id: 2 }
    const request = createMock<Request>({
      user,
      params: { id: '1' },
      body: data
    })

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
