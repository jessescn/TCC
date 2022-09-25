import { baseSetup } from 'controllers/__mocks__'
import { ComentarioModel } from 'models/comentario'
import { UserModel } from 'models/user'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { ReadCommentsByProcedimentoController } from '../read-by-procedimento'

describe('ReadByProcedimento Controller', () => {
  const comentario = createMock<ComentarioModel>({ user: { id: 2 } })
  const { user, response, spies } = baseSetup('colegiado_comments')

  const makeSut = () => {
    const service = {
      findAll: jest.fn().mockResolvedValue([comentario])
    } as any

    return { sut: new ReadCommentsByProcedimentoController(service), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should response with all comentarios filtered by specific procedimentoId', async () => {
    const request = createMock<Request>({ params: { id: '1' }, user })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({ procedimentoId: 1 })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should response with only comentarios which has user as author', async () => {
    const userWithLimitedPermission = createMock<UserModel>({
      id: 2,
      permissoes: { colegiado_comments: 'owned' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithLimitedPermission
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.findAll).toBeCalledWith({
      user: { id: userWithLimitedPermission.id },
      procedimentoId: 1
    })
    expect(response.json).toBeCalledWith([comentario])
  })

  it('should response with unauthorized error if user does not have resource access privileges', async () => {
    const userWithoutPermission = createMock<UserModel>({
      id: 2,
      permissoes: { colegiado_comments: 'not_allowed' }
    })

    const request = createMock<Request>({
      params: { id: '1' },
      user: userWithoutPermission
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.unauthorized)
  })
})