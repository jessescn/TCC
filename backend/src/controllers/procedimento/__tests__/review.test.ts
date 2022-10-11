import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { NewRevisao } from 'repository/sequelize/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReviewProcedimentoController } from '../review'

describe('ReviewProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_review')

  const makeSut = () => {
    const service = {
      newReview: jest.fn().mockResolvedValue(procedimento)
    }

    return {
      sut: new ReviewProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  const data = createMock<NewRevisao>({
    aprovado: true,
    comentario: 'comentario',
    campos: []
  })

  it('should include an new review to an existing procedimento', async () => {
    const request = createMock<Request>({
      params: { id: '1' },
      actor,
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.newReview).toBeCalledWith(
      Number(request.params.id),
      request.actor,
      data
    )
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if params does not have id', async () => {
    const invalidRequest = createMock<Request>({
      params: {},
      body: data,
      actor
    })

    const { sut } = makeSut()

    await sut.exec(invalidRequest, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
