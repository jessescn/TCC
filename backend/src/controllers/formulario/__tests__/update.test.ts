import { baseSetup } from 'controllers/__mocks__'
import { FormularioModel } from 'domain/models/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateFormularioController } from '../update'

describe('UpdateFormulario Controller', () => {
  const formulario = createMock<FormularioModel>()
  const { response, spies, actor } = baseSetup('formulario_update')

  const makeSut = () => {
    const service = {
      update: jest.fn().mockResolvedValue(formulario)
    } as any

    return { sut: new UpdateFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should update an existing formulario', async () => {
    const data: Partial<FormularioModel> = { nome: 'teste' }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })

    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(formulario)
  })

  it('should respond with BadRequest error if request body contains invalid update data', async () => {
    const invalidData: Partial<FormularioModel> = { id: 2 }
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: invalidData
    })

    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
