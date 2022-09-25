import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { NewTipoProcedimento } from 'repository/sequelize/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateTipoProcedimentoController } from '../create'

describe('CreateTipoProcedimento Controller', () => {
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const { user, spies, response } = baseSetup('tipo_procedimento_create')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(tipoProcedimento)
    } as any

    return { sut: new CreateTipoProcedimentoController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should create a new tipoProcedimento', async () => {
    const data = createMock<NewTipoProcedimento>()
    const request = createMock<Request>({ user, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(user, data)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(tipoProcedimento)
  })

  it('should respond with BadRequestError if data does not contains all mandatory fields', async () => {
    const data = { colegiado: true }
    const request = createMock<Request>({ user, body: data })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
