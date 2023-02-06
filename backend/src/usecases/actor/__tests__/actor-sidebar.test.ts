import { ActorModel } from 'domain/models/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { ActorSidebarUseCase } from '../actor-sidebar'
describe('ActorSidebar UseCase', () => {
  const outdatedTipoProcedimento = createMock<TipoProcedimentoModel>({
    id: 1,
    dataInicio: '01-01-2023',
    dataFim: '02-01-2023'
  })
  const outOfPublicos = createMock<TipoProcedimentoModel>({
    publicos: ['publico1']
  })
  const activeTipoProcedimento = createMock<TipoProcedimentoModel>({
    publicos: ['publico1', 'publico2']
  })

  const tipoProcedimentos = [
    outdatedTipoProcedimento,
    outOfPublicos,
    activeTipoProcedimento
  ]
  const repo = createMock<ITipoProcedimentoRepository>({
    findAll: jest.fn().mockResolvedValue(tipoProcedimentos)
  })

  it('should return only active tipo procedimentos', async () => {
    const actor = createMock<ActorModel>({ publico: ['publico2'] })
    const request = createMock<Request>({ actor })
    const sut = new ActorSidebarUseCase(repo)

    const result = await sut.execute(request)

    expect(result).toEqual([activeTipoProcedimento])
  })
})
