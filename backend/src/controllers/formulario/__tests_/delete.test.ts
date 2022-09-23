import { FormularioService } from 'services/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteFormularioController } from '../delete'
import { bootstrap } from '../__mocks__'

describe('DeleteFormulario Controller', () => {
  const { formulario, response, user, spies } = bootstrap('form_delete')

  const makeSut = () => {
    const service = createMock<FormularioService>({
      create: jest.fn().mockResolvedValue(formulario),
      delete: jest.fn().mockResolvedValue(formulario)
    })

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
