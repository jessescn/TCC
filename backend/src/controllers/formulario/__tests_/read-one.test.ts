import { FormularioService } from 'services/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadOneFormularioController } from '../read-one'
import { bootstrap } from '../__mocks__'

describe('ReadOneFormulario Controller', () => {
  const { user, formulario, response, spies } = bootstrap('form_delete')

  const makeSut = () => {
    const service = createMock<FormularioService>({
      findOne: jest.fn().mockResolvedValue(formulario)
    })

    return { sut: new ReadOneFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with a formulario finded by id', async () => {
    const request = createMock<Request>({ user, params: { id: '1' } })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).toBeCalledWith(1)
    expect(spies.jsonSpy).toBeCalledWith(formulario)
  })

  it('should respond with BadRequest if request does not have id on params', async () => {
    const request = createMock<Request>({ user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findOne).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
