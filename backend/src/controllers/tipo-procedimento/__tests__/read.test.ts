import { ReadTipoProcedimentoController } from 'controllers/tipo-procedimento/read'
import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'
import { createMock, createMockList } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ProfileModel } from 'domain/models/profile'

describe('ReadTipoProcedimento Controller', () => {
  const tipoProcedimentos = createMockList<TipoProcedimentoModel>(2)
  const { actor, spies, response } = baseSetup('tipo_procedimento_read')
  const pagination = { page: 1, per_page: 1000, term: null }

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue({
        data: tipoProcedimentos,
        total: tipoProcedimentos.length
      })
    }

    return {
      sut: new ReadTipoProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should return all tipoProcedimentos', async () => {
    const request = createMock<Request>({ actor })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({ deleted: false }, pagination)
    expect(response.json).toBeCalledWith({
      data: tipoProcedimentos,
      total: tipoProcedimentos.length
    })
  })

  it('should return only tipoProcedimentos owned by actor', async () => {
    const actorWithLimitedScope = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: { tipo_procedimento_read: 'owned' }
      })
    })
    const request = createMock<Request>({ actor: actorWithLimitedScope })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith(
      {
        createdBy: actorWithLimitedScope.id,
        deleted: false
      },
      pagination
    )
  })

  it('should throw an UnauthorizedError if actor does not have permission', async () => {
    const actorWithoutPermission = createMock<ActorModel>({
      profile: createMock<ProfileModel>({
        permissoes: {}
      })
    })
    const request = createMock<Request>({ actor: actorWithoutPermission })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
