import { baseSetup } from 'controllers/__mocks__'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteTipoProcedimentoController } from '../delete'

describe('DeleteTipoProcedimento Controller', () => {
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const { user, spies, response } = baseSetup('tipo_procedimento_update')

  const makeSut = () => {
    const service = {
      delete: jest.fn().mockResolvedValue(tipoProcedimento)
    }

    return {
      sut: new DeleteTipoProcedimentoController(service as any),
      service
    }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should delete an existing tipoProcedimento', async () => {
    const request = createMock<Request>({ params: { id: '1' }, user })
    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(response.json).toBeCalledWith(tipoProcedimento)
  })

  it('should respond with BadRequestError if id is not provided', async () => {
    const request = createMock<Request>({ user })
    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
