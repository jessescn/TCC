import {
  ProcedimentoModel,
  Status,
  VotoProcedimento
} from 'domain/models/procedimento'
import { IProcedimentoRepo } from 'repositories'
import { ColegiadoService } from 'services/colegiado'
import { createMock } from 'ts-auto-mock'
import { BadRequestError, NotFoundError } from 'types/express/errors'

describe('Colegiado Service', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const status = createMock<Status>()

  const statusService = {
    execute: jest.fn().mockResolvedValue(status)
  } as any

  describe('homologate', () => {
    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    it("should update status of an existing procedimento to 'homologate'", async () => {
      const sut = new ColegiadoService(repo, statusService)

      const result = await sut.homologate(1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.updateStatus).toBeCalledWith(1, 'deferido')
    })

    it('should throw a NotFoundError if procedimento does not exists', async () => {
      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(undefined)
      })

      const sut = new ColegiadoService(repo, statusService)

      const shouldThrow = async () => {
        await sut.homologate(1)
      }

      expect(shouldThrow).rejects.toThrow(NotFoundError)
    })
  })

  describe('updateVote', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [{ data: new Date().toISOString(), status: 'em_homologacao' }]
    })

    const statusService = {
      execute: jest.fn().mockResolvedValue(status)
    } as any

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      updateVote: jest.fn().mockResolvedValue(procedimento),
      updateStatus: jest.fn().mockResolvedValue(procedimento)
    })

    it('should update a vote of an existing procedimento', async () => {
      const data = createMock<VotoProcedimento>()
      const sut = new ColegiadoService(repo, statusService)

      const result = await sut.updateVote(1, data)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(1)
      expect(repo.updateVote).toBeCalledWith(1, data)
    })

    it("should update status to 'deferido' if reach positive majority of votes", async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: [{ data: new Date().toISOString(), status: 'em_homologacao' }],
        votos: [
          { aprovado: true, autor: 1, data: new Date().toISOString() },
          { aprovado: true, autor: 1, data: new Date().toISOString() }
        ]
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento),
        updateVote: jest.fn().mockResolvedValue(procedimento),
        updateStatus: jest.fn().mockResolvedValue(procedimento)
      })

      const data = createMock<VotoProcedimento>()
      const sut = new ColegiadoService(repo, statusService)

      await sut.updateVote(1, data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'deferido')
    })

    it("should update status to índeferido' if reach positive majority of votes", async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: [{ data: new Date().toISOString(), status: 'em_homologacao' }],
        votos: [
          { aprovado: false, autor: 1, data: new Date().toISOString() },
          { aprovado: false, autor: 1, data: new Date().toISOString() }
        ]
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento),
        updateVote: jest.fn().mockResolvedValue(procedimento),
        updateStatus: jest.fn().mockResolvedValue(procedimento)
      })

      const data = createMock<VotoProcedimento>()
      const sut = new ColegiadoService(repo, statusService)

      await sut.updateVote(1, data)

      expect(statusService.execute).toBeCalledWith(procedimento, 'indeferido')
    })

    it("should throw BadRequestError if procedimento isn't on 'em_homologacao' status", async () => {
      const procedimento = createMock<ProcedimentoModel>({
        status: []
      })

      const statusService = {
        execute: jest.fn().mockResolvedValue(status)
      } as any

      const repo = createMock<IProcedimentoRepo>({
        findOne: jest.fn().mockResolvedValue(procedimento),
        updateVote: jest.fn().mockResolvedValue(procedimento),
        updateStatus: jest.fn().mockResolvedValue(procedimento)
      })

      const data = createMock<VotoProcedimento>()
      const sut = new ColegiadoService(repo, statusService)

      const shouldThrow = async () => {
        await sut.updateVote(1, data)
      }

      expect(shouldThrow).rejects.toThrow(BadRequestError)
    })
  })

  describe('deleteVote', () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [{ data: new Date().toISOString(), status: 'em_homologacao' }]
    })

    const statusService = {
      execute: jest.fn().mockResolvedValue(status)
    } as any

    const repo = createMock<IProcedimentoRepo>({
      findOne: jest.fn().mockResolvedValue(procedimento),
      removeVote: jest.fn().mockResolvedValue(procedimento)
    })

    it('should remove a vote from an existing procedimento', async () => {
      const sut = new ColegiadoService(repo, statusService)

      const result = await sut.deleteVote(2, 1)

      expect(result).toEqual(procedimento)
      expect(repo.findOne).toBeCalledWith(2)
      expect(repo.removeVote).toBeCalledWith(2, 1)
    })
  })
})
