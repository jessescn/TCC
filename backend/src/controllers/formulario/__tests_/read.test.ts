import { UserModel } from 'models/user'
import { FormularioService } from 'services/formulario'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadFormularioController } from '../read'
import { bootstrap } from '../__mocks__'

describe('ReadFormulario Controller', () => {
  const { user, formulario, response, spies } = bootstrap('form_read')

  const makeSut = () => {
    const service = createMock<FormularioService>({
      findAll: jest.fn().mockResolvedValue([formulario])
    })

    return { sut: new ReadFormularioController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should respond with all formularios', async () => {
    const request = createMock<Request>({ user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({})
    expect(response.json).toBeCalledWith([formulario])
  })

  it('should respond with only formularios createdBy user', async () => {
    const userWithLimitedPrivileges = createMock<UserModel>({
      permissoes: { form_read: 'owned' }
    })
    const request = createMock<Request>({ user: userWithLimitedPrivileges })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      createdBy: userWithLimitedPrivileges.id
    })
  })

  it('should respond with UnauthorizedError if user does not have privileges', async () => {
    const userWithoutPrivileges = createMock<UserModel>({
      permissoes: { form_read: 'not_allowed' }
    })
    const request = createMock<Request>({ user: userWithoutPrivileges })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).not.toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})
