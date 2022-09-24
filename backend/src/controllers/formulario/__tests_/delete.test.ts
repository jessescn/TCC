import { baseSetup } from 'controllers/__mocks__'
import { FormularioModel } from 'models/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteFormularioController } from '../delete'

describe('DeleteFormulario Controller', () => {
  const formulario = createMock<FormularioModel>()
  const { response, user, spies } = baseSetup('form_delete')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(formulario),
      delete: jest.fn().mockResolvedValue(formulario)
    } as any

    return { sut: new DeleteFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should delete an existing formulario', async () => {
    const request = createMock<Request>({ user, params: { id: '1' } })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).toBeCalledWith(1)
    expect(spies.jsonSpy).toBeCalledWith(formulario)
  })

  it('should respond with badRequest if does not have id param', async () => {
    const request = createMock<Request>({ user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.delete).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
