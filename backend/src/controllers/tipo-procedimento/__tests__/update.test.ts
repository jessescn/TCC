import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateTipoProcedimentoController } from '../update'

describe('UpdateTipoProcedimento Controller', () => {
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const { actor, spies, response } = baseSetup('tipo_procedimento_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(tipoProcedimento)
    }

    return {
      sut: new UpdateTipoProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing tipoProcedimentos', async () => {
    const data: Partial<TipoProcedimentoModel> = { escopo: 'test' }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(tipoProcedimento)
  })

  it('should respond with BadRequest if body includes invalid field to update', async () => {
    const data: Partial<TipoProcedimentoModel> = { id: 1 }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
    expect(service.update).not.toBeCalled()
  })
})
