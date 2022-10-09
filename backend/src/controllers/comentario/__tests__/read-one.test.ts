import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'domain/models/comentario'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadOneComentarioController } from '../read-one'
import { ProfileModel } from 'domain/models/profile'

describe('ReadOneComentario Controller', () => {
  const comentario = createMock<ComentarioModel>({ actor: { id: 2 } })
  const { actor, response, spies } = baseSetup('comentario_read')

  const makeSut = () => {
    const service = {
      findOne: jest.fn().mockResolvedValue(comentario)
    } as any

    return { sut: new ReadOneComentarioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with a specific comentario by id', async () => {
    const request = createMock<Request>({ params: { id: '1' }, actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(comentario)
  })

  it('should respond with unauthorized error if actor have limited scope', async () => {
    const actorWithLimitedPrivileges = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: { comentario_read: 'owned' }
      })
    })

    const request = createMock<Request>({
      params: { id: '1' },
      actor: actorWithLimitedPrivileges
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })

  it('should respond with unauthorized error if actor hasnt access privileges', async () => {
    const actorWithoutPrivileges = createMock<ActorModel>({
      profile: createMock<ProfileModel>({ permissoes: {} })
    })

    const request = createMock<Request>({
      params: { id: '1' },
      actor: actorWithoutPrivileges
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
