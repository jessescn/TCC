import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, statusList } from 'domain/models/procedimento'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { IRepository } from 'repositories'
import { MailSender } from 'repositories/nodemailer/mail'
import { ProcedimentoStatusService } from 'services/procedimento-status'
import templates from 'templates'
import { createMock } from 'ts-auto-mock'

describe('ProcedimentoStatus Service', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const actor = createMock<ActorModel>()

  const repo = createMock<IRepository>({
    findOne: jest.fn().mockResolvedValue(actor)
  })

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    jest
      .spyOn(MailSender, 'send')
      .mockResolvedValue(createMock<SMTPTransport.SentMessageInfo>())
  })

  it('should execute trading rules related to status and return new status object', async () => {
    const sut = new ProcedimentoStatusService(repo)

    const result = await sut.execute(procedimento, 'criado')

    const email = templates['update-procedimento-status'](actor.email, {
      procedimento,
      novoStatus: statusList.criado.label
    })

    expect(repo.findOne).toBeCalledWith(procedimento.createdBy)
    expect(MailSender.send).toBeCalledWith(email)
    expect(result).toEqual({
      status: 'criado',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
