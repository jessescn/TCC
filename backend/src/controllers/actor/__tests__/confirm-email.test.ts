import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ConfirmEmailController, ConfirmEmailPayload } from '../confirm-email'

describe('ConfirmEmail Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup()

  const makeSut = () => {
    const service = {
      verifyActorByCode: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new ConfirmEmailController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should verify actor email', async () => {
    const data = createMock<ConfirmEmailPayload>()
    const request = createMock<Request>({ actor, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.verifyActorByCode).toBeCalledWith(data.code)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if request body does not contains some mandatory field', async () => {
    const request = createMock<Request>({ actor, body: {} })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
