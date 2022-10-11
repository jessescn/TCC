import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import {
  UpdateStatusProcedimento,
  UpdateStatusProcedimentoController
} from '../update-status'

describe('UpdateStatusProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_update')

  const makeSut = () => {
    const service = {
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    }

    return {
      sut: new UpdateStatusProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  const data = createMock<UpdateStatusProcedimento>({
    status: 'criado'
  })

  it('should update status of an existing procedimento', async () => {
    const request = createMock<Request>({
      params: { id: '1' },
      actor,
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.updateStatus).toBeCalledWith(
      Number(request.params.id),
      data.status
    )
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if its not a valid status', async () => {
    const invalidRequest = createMock<Request>({
      params: { id: '1' },
      body: { status: 'invalid_status' },
      actor
    })

    const { sut } = makeSut()

    await sut.exec(invalidRequest, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
