import { baseSetup } from 'controllers/__mocks__'
import { FormularioModel } from 'domain/models/formulario'
import { NewFormulario } from 'repositories/sequelize/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateFormularioController } from '../create'

describe('CreateFormulario Controller', () => {
  const formulario = createMock<FormularioModel>()
  const { actor, spies, response } = baseSetup('formulario_create')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(formulario)
    } as any

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
    const request = createMock<Request>({ actor, body: newFormulario })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(actor, newFormulario)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(formulario)
  })

  it('should respond with badRequest error if request body does not have required fields', async () => {
    const newFormularioWithoutFields = {
      campos: []
    } as any
    const request = createMock<Request>({
      actor,
      body: newFormularioWithoutFields
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).not.toBeCalled()
    expect(spies.sendSpy).toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
