import { NewFormulario } from 'models/formulario'
import { FormularioService } from 'services/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateFormularioController } from '../create'
import { bootstrap } from '../__mocks__'

describe('CreateFormulario Controller', () => {
  const { formulario, user, spies, response } = bootstrap('form_create')

  const makeSut = () => {
    const service = createMock<FormularioService>({
      create: jest.fn().mockResolvedValue(formulario)
    })

    return { sut: new CreateFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should create a new formulario', async () => {
    const newFormulario = createMock<NewFormulario>({
      nome: 'test',
      campos: []
    })
    const request = createMock<Request>({ user, body: newFormulario })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(user, newFormulario)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(formulario)
  })

  it('should respond with badRequest error if request body does not have required fields', async () => {
    const newFormularioWithoutFields = createMock<NewFormulario>({
      campos: []
    })
    const request = createMock<Request>({
      user,
      body: newFormularioWithoutFields
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).not.toBeCalled()
    expect(spies.sendSpy).toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
