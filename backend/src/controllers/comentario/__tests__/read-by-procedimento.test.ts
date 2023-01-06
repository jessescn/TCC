import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'domain/models/comentario'
import { ActorModel } from 'domain/models/actor'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadCommentsByProcedimentoController } from '../read-by-procedimento'
import { ProfileModel } from 'domain/models/profile'

describe('ReadByProcedimento Controller', () => {
  const comentario = createMock<ComentarioModel>({ actor: { id: 2 } })
  const { actor, response, spies } = baseSetup('comentario_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([comentario])
    } as any

    return { sut: new ReadCommentsByProcedimentoController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should response with all comentarios filtered by specific procedimentoId', async () => {
    const request = createMock<Request>({ params: { id: '1' }, actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({ procedimentoId: 1 })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should response with only comentarios which has actor as author', async () => {
    const actorWithLimitedPermission = createMock<ActorModel>({
      id: 2,
      profile: createMock<ProfileModel>({
        permissoes: { comentario_read: 'owned' }
      })
    })

    const request = createMock<Request>({
      params: { id: '1' },
      actor: actorWithLimitedPermission
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      createdBy: actorWithLimitedPermission.id,
      procedimentoId: 1
    })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should response with unauthorized error if actor does not have resource access privileges', async () => {
    const actorWithoutPermission = createMock<ActorModel>({
      id: 2,
      profile: createMock<ProfileModel>({ permissoes: {} })
    })

    const request = createMock<Request>({
      params: { id: '1' },
      actor: actorWithoutPermission
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
