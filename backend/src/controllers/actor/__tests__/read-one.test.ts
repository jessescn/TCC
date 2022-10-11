import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadOneActorController } from '../read-one'

describe('ReadOneUsuario Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup('actor_read')

  const makeSut = () => {
    const service = {
      findOne: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new ReadOneActorController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should find an existing usuario by id', async () => {
    const request = createMock<Request>({ actor, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if does not contains id on params', async () => {
    const request = createMock<Request>({ actor })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
