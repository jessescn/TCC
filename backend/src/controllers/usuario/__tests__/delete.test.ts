import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteActorController } from '../delete'

describe('DeleteActor Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup('actor_delete')

  const makeSut = () => {
    const service = {
      delete: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new DeleteActorController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should delete an existing actor', async () => {
    const request = createMock<Request>({ actor, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if does not contains id on params', async () => {
    const request = createMock<Request>({ actor })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
