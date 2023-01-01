import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel } from 'domain/models/procedimento'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { MailSender } from 'repositories/nodemailer/mail'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import templates from 'templates'
import { createMock } from 'ts-auto-mock'
import { DeferidoStatusHandler } from '../deferido'

describe('DeferidoStatus Handler', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const autor = createMock<ActorModel>()

  const tipoProcedimentoRepo = createMock<ITipoProcedimentoRepository>()
  const formularioRepo = createMock<IFormularioRepository>()

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    jest
      .spyOn(MailSender, 'send')
      .mockResolvedValue(createMock<SMTPTransport.SentMessageInfo>())
  })

  const sut = new DeferidoStatusHandler(tipoProcedimentoRepo, formularioRepo)

  it('should return a new status', async () => {
    const result = await sut.execute({ procedimento, autor })

    const email = templates['approve-procedimento'](autor.email, {
      procedimento
    })

    expect(MailSender.send).toBeCalledWith(email)
    expect(result).toEqual({
      status: 'deferido',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
