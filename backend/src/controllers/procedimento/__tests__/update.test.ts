import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateProcedimentoController } from '../update'

describe('UpdateProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(procedimento)
    }

    return { sut: new UpdateProcedimentoController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing procedimento', async () => {
    const data: Partial<ProcedimentoModel> = {
      respostas: []
    }
    const request = createMock<Request>({
      params: { id: '1' },
      body: data,
      actor
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(Number(request.params.id), {
      revisoes: data.revisoes,
      respostas: data.respostas
    })
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if request params does not have id attribute', async () => {
    const data: Partial<ProcedimentoModel> = {
      respostas: []
    }
    const request = createMock<Request>({
      params: {},
      body: data,
      actor
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
