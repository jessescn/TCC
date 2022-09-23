import { FormularioModel } from 'models/formulario'
import { FormularioService } from 'services/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateFormularioController } from '../update'
import { bootstrap } from '../__mocks__'

describe('UpdateFormulario Controller', () => {
  const { formulario, response, spies, user } = bootstrap('form_update')

  const makeSut = () => {
    const service = createMock<FormularioService>({
      update: jest.fn().mockResolvedValue(formulario)
    })

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
      user,
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
      user,
      params: { id: '1' },
      body: invalidData
    })

    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.update).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
