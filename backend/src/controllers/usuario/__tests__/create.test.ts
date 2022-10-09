import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { NewActor } from 'repository/sequelize/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateActorController } from '../create'

describe('CreateActor Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup('actor_create')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new CreateActorController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should create a new usuario', async () => {
    const data = createMock<NewActor>()
    const request = createMock<Request>({ actor, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(data)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if request body does not contains some mandatory field', async () => {
    const data = { email: 'test@teste.com', nome: 'test' }
    const request = createMock<Request>({ actor, body: data })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
