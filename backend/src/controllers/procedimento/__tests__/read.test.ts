import { baseSetup } from 'controllers/__mocks__'
import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadProcedimentoController } from '../read'

describe('ReadProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([procedimento])
    }

    return { sut: new ReadProcedimentoController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all procedimentos', async () => {
    const request = createMock<Request>({ actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith([procedimento])
  })

  it('should respond only with procedimentos created by actor', async () => {
    const actor = createMock<ActorModel>({
      profile: { permissoes: { procedimento_read: 'owned' } }
    })
    const request = createMock<Request>({ actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({ createdBy: actor.id })
    expect(response.json).toBeCalledWith([procedimento])
  })

  it('should respond with UnauthorizedError if actor profile does not have permission', async () => {
    const actor = createMock<ActorModel>({
      profile: { permissoes: {} }
    })
    const request = createMock<Request>({ actor })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
