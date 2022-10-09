import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel, VotoProcedimento } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { UpdateVoteController } from '../update-vote'

describe('UpdateVote Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, response, spies } = baseSetup('colegiado_update_vote')

  const makeSut = () => {
    const service = {
      updateVote: jest.fn().mockResolvedValue(procedimento)
    }

    return { sut: new UpdateVoteController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
  })

  it('should update/create a vote in an existing procedimento', async () => {
    const data = createMock<VotoProcedimento>({ autor: 1, aprovado: true })
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.updateVote).toBeCalledWith(1, data)
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if some mandatory field is not provided', async () => {
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: { autor: 1 }
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
