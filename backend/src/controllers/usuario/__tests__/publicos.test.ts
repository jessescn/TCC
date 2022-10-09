import { baseSetup } from 'controllers/__mocks__'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { PublicosController } from '../publicos'

describe('PublicosActor Controller', () => {
  const publicos = ['publico1', 'publico2']
  const { actor, response, spies } = baseSetup()

  const makeSut = () => {
    const service = {
      getPublicos: jest.fn().mockResolvedValue(publicos)
    }

    return { sut: new PublicosController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should find an existing usuario by id', async () => {
    const request = createMock<Request>({ actor, params: { id: '1' } })
    const { service, sut } = makeSut()

    await sut.exec(request, response as any)

    expect(service.getPublicos).toBeCalled()
    expect(response.json).toBeCalledWith(publicos)
  })

  it('should respond with InternalServerError if some unknown error happen', async () => {
    const service = {
      getPublicos: jest.fn().mockRejectedValue(new Error())
    }
    const sut = new PublicosController(service as any)

    const request = createMock<Request>({ actor, params: { id: '1' } })

    await sut.exec(request, response as any)

    expect(service.getPublicos).toBeCalled()
    expect(response.status).toBeCalledWith(HttpStatusCode.serverError)
  })
})
