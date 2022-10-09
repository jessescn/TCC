import { baseSetup } from 'controllers/__mocks__'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { createMock } from 'ts-auto-mock'
import { HttpStatusCode, Request } from 'types/express'
import { DeleteVoteController, RemoteDeleteVote } from '../delete-vote'

describe('DeleteVote Controller', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const { actor, response, spies } = baseSetup('colegiado_delete_vote')

  const makeSut = () => {
    const service = {
      deleteVote: jest.fn().mockResolvedValue(procedimento)
    }

    return { sut: new DeleteVoteController(service as any), service }
  }

  afterEach(() => {
    response.status.mockClear()
    spies.sendSpy.mockClear()
  })

  it('should delete a vote from an existing procedimento', async () => {
    const data = createMock<RemoteDeleteVote>({ autor: 1 })
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: data
    })

    const { sut, service } = makeSut()

    await sut.exec(request, response as any)

    expect(service.deleteVote).toBeCalledWith(1, data.autor)
    expect(response.json).toBeCalledWith(procedimento)
  })

  it('should respond with BadRequestError if some mandatory field is not provided', async () => {
    const request = createMock<Request>({
      actor,
      params: { id: '1' },
      body: {}
    })

    const { sut } = makeSut()

    await sut.exec(request, response as any)

    expect(response.status).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
