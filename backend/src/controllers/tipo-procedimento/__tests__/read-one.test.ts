import { ReadOneTipoProcedimentoController } from 'controllers/tipo-procedimento/read-one'
import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'

describe('ReadOneTipoProcedimento Controller', () => {
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const { user, spies, response } = baseSetup('tipo_procedimento_read')

  const makeSut = () => {
    const service = {
      findOne: jest.fn().mockResolvedValue(tipoProcedimento)
    }

    return {
      sut: new ReadOneTipoProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should return an existing tipoProcedimento by id', async () => {
    const request = createMock<Request>({ params: { id: '1' }, user })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(tipoProcedimento)
  })

  it('should respond with BadRequestError if id is not provided', async () => {
    const request = createMock<Request>({ user })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
