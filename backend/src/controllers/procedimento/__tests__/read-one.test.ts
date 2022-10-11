import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadOneProcedimentoController } from '../read-one'

describe('ReadOneProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_read')

  const makeSut = () => {
    const service = {
      findOne: jest.fn().mockResolvedValue(procedimento)
    }

    return { sut: new ReadOneProcedimentoController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should find an existing procedimento by id', async () => {
    const request = createMock<Request>({ params: { id: '1' }, actor })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(Number(request.params.id))
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if request params does not have id attribute', async () => {
    const invalidRequest = createMock<Request>({ params: {}, actor })

    const { sut } = makeSut()

    await sut.exec(invalidRequest, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
