import { ReadTipoProcedimentoController } from 'controllers/tipo-procedimento/read'
import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { UserModel } from 'domain/models/user'
import { createMock, createMockList } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'

describe('ReadTipoProcedimento Controller', () => {
  const tipoProcedimentos = createMockList<TipoProcedimentoModel>(2)
  const { user, spies, response } = baseSetup('tipo_procedimento_read')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
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
    const request = createMock<Request>({ user })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith(tipoProcedimentos)
  })

  it('should return only tipoProcedimentos owned by user', async () => {
    const userWithLimitedScope = createMock<UserModel>({
      permissoes: { tipo_procedimento_read: 'owned' }
    })
    const request = createMock<Request>({ user: userWithLimitedScope })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      createdBy: userWithLimitedScope.id
    })
  })

  it('should throw an UnauthorizedError if user does not have permission', async () => {
    const userWithoutPermission = createMock<UserModel>({
      permissoes: { tipo_procedimento_read: 'not_allowed' }
    })
    const request = createMock<Request>({ user: userWithoutPermission })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
