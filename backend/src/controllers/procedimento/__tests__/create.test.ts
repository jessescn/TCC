import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { NewProcedimento } from 'repositories/sequelize/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { CreateProcedimentoController } from '../create'

describe('CreateProcedimento Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, spies, response } = baseSetup('procedimento_create')

  const makeSut = () => {
    const service = {
      create: jest.fn().mockResolvedValue(procedimento)
    }

    return { sut: new CreateProcedimentoController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
    spies.jsonSpy.mockClear()
  })

  it('should create a new procedimento', async () => {
    const newProcedimento = createMock<NewProcedimento>({
      tipo: 1,
      respostas: []
    })
    const request = createMock<Request>({ actor, body: newProcedimento })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.create).toBeCalledWith(request.actor, newProcedimento)
    expect(response.status).toBeCalledWith(HttpStatusCode.created)
    expect(spies.sendSpy).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if some mandatory field is missing', async () => {
    const invalidNewProcedimento = {
      respostas: []
    }
    const request = createMock<Request>({
      actor,
      body: invalidNewProcedimento
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
