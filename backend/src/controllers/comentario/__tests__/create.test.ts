import {
  CreateComentarioController,
  NewComentario
} from 'controllers/comentario/create'
import { ComentarioService } from 'services/entities/comentario-service'
import { HttpStatusCode } from 'types/express'

describe('CreateComentarioController tests', () => {
  const sut = CreateComentarioController()

  const validUser = {
    id: 1,
    permissoes: {
      comentario_create: 'all'
    }
  }

  const newComentario: NewComentario = {
    conteudo: 'test',
    procedimento: 1
  }

  const comentario = {} // TODO: change to a comentario mock implementation

  const createRequestResponse = (data: any): any => {
    return data
  }

  const baseResponse = createRequestResponse({
    status: jest.fn().mockReturnValue({ send: jest.fn() })
  })

  const baseRequest = createRequestResponse({
    body: newComentario,
    user: validUser
  })

  const mockComentarioServiceCreate = (data: any) => {
    return jest.spyOn(ComentarioService, 'create').mockResolvedValue(data)
  }

  beforeEach(() => {
    mockComentarioServiceCreate(comentario)
  })

  it('should create a response with new comentario', () => {
    const sendSpy = jest.fn()
    const statusMock = jest.fn().mockReturnValue({ send: sendSpy })

    const response = createRequestResponse({ status: statusMock })

    sut.exec(baseRequest, response)

    expect(statusMock).toBeCalledWith(HttpStatusCode.created)
    expect(sendSpy).toBeCalledWith(comentario)
  })

  it('should call service with correct arguments', () => {
    const serviceCreateSpy = mockComentarioServiceCreate(comentario)

    sut.exec(baseRequest, baseResponse)

    expect(serviceCreateSpy).toBeCalledWith({
      conteudo: newComentario.conteudo,
      procedimentoId: newComentario.procedimento,
      createdBy: validUser.id
    })
  })
})
