import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, statusList } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import { IActorRepository } from 'repositories/sequelize/actor'
import { ProcedimentoStatusService } from 'services/procedimento-status'
import templates from 'templates'
import { createMock } from 'ts-auto-mock'

describe('ProcedimentoStatus Service', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const actor = createMock<ActorModel>()

  const repo = createMock<IActorRepository>({
    findOne: jest.fn().mockResolvedValue(actor)
  })

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
    jest.spyOn(MailSender, 'send')
  })

  it('should execute trading rules related to status and return new status object', async () => {
    const sut = new ProcedimentoStatusService(repo)

    const result = await sut.execute(procedimento, 'criado')

    const email = templates['update-procedimento-status'](actor.email, {
      procedimento,
      novoStatus: statusList.criado.label,
      dataAtualizacao: new Date().toISOString()
    })

    expect(repo.findOne).toBeCalledWith(procedimento.createdBy)
    expect(MailSender.send).toBeCalledWith(email)
    expect(result).toEqual({
      status: 'criado',
      data: new Date('2020-01-01').toISOString()
    })
  })

  it('should send email with transition (previous and current status)', async () => {
    const procedimento = createMock<ProcedimentoModel>({
      status: [{ data: new Date().toISOString(), status: 'criado' }]
    })
    const sut = new ProcedimentoStatusService(repo)

    await sut.execute(procedimento, 'correcoes_pendentes')

    const email = templates['update-procedimento-status'](actor.email, {
      procedimento,
      novoStatus: statusList.correcoes_pendentes.label,
      statusAntigo: statusList.criado.label,
      dataAtualizacao: new Date().toISOString()
    })

    expect(MailSender.send).toBeCalledWith(email)
  })
})
