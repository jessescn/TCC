import { baseSetup } from 'controllers/__mocks__'

import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateActorController } from '../update'

describe('UpdateUsuario Controller', () => {
  const usuario = createMock<ActorModel>()
  const { actor, response, spies } = baseSetup('actor_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(usuario)
    }

    return { sut: new UpdateActorController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing usuario', async () => {
    const data: Partial<ActorModel> = { nome: 'new name' }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(usuario)
  })

  it('should respond with BadRequest if request body contains invalid update field', async () => {
    const data: Partial<ActorModel> = { id: 2 }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
