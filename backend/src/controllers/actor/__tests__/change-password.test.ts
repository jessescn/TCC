import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import {
  ChangePasswordController,
  ChangePasswordPayload
} from '../change-password'

describe('ChangePassword Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup()

  const makeSut = () => {
    const service = {
      changeActorPasswordByCode: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new ChangePasswordController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should change actor password', async () => {
    const data = createMock<ChangePasswordPayload>()
    const request = createMock<Request>({ actor, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.changeActorPasswordByCode).toBeCalledWith(
      data.code,
      data.password
    )
    expect(response.status).toBeCalledWith(HttpStatusCode.ok)
    expect(spies.sendSpy).toBeCalled()
  })

  it('should respond with BadRequest if request body does not contains some mandatory field', async () => {
    const request = createMock<Request>({ actor, body: {} })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
