import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { IActorRepository } from 'repositories/sequelize/actor'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { createMock } from 'ts-auto-mock'
import { NotFoundError } from 'types/express/errors'
import { EncaminhadoStatusHandler } from '../encaminhado'

describe('EncaminhadoStatus Handler', () => {
  const OLD_ENV = process.env
  const procedimento = createMock<ProcedimentoModel>({
    tipo: 1,
    respostas: [{ campos: [], formulario: 1 }]
  })
  const tipoProcedimento = createMock<TipoProcedimentoModel>()
  const formulario = createMock<FormularioModel>({
    template: 'teste 123',
    id: 1
  })
  const autor = createMock<ActorModel>()

  const formularioRepo = createMock<IFormularioRepository>({
    findAll: jest.fn().mockResolvedValue([formulario])
  })
  const tipoRepo = createMock<ITipoProcedimentoRepository>({
    findOne: jest.fn().mockResolvedValue(tipoProcedimento)
  })
  const actorRepo = createMock<IActorRepository>({
    findOne: jest.fn().mockResolvedValue(autor)
  })

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  const sut = new EncaminhadoStatusHandler(formularioRepo, tipoRepo, actorRepo)

  it('should return a new status', async () => {
    const result = await sut.execute({ procedimento, autor })

    expect(result).toEqual({
      status: 'encaminhado',
      data: new Date('2020-01-01').toISOString()
    })

    process.env = {}
    await sut.execute({ procedimento, autor })
  })

  it('should throw NotFoundError if procedimento does not have related tipo procedimento', async () => {
    const procedimento = createMock<ProcedimentoModel>()

    const shouldThrow = async () => {
      await sut.execute({ procedimento, autor })
    }

    expect(shouldThrow).rejects.toThrow(NotFoundError)
  })

  it('should throw NotFoundError if tipo procedimento not found', async () => {
    const tipoRepo = createMock<ITipoProcedimentoRepository>({
      findOne: jest.fn().mockResolvedValue(null)
    })
    const sut = new EncaminhadoStatusHandler(
      formularioRepo,
      tipoRepo,
      actorRepo
    )

    const shouldThrow = async () => {
      await sut.execute({ procedimento, autor })
    }

    expect(shouldThrow).rejects.toThrow(NotFoundError)
  })
})
