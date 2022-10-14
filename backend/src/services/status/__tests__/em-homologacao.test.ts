import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { ProfileModel } from 'domain/models/profile'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { IRepository } from 'repositories'
import { MailSender } from 'repositories/nodemailer/mail'
import templates from 'templates'
import { createMock } from 'ts-auto-mock'
import { EmHomologacaoStatusHandler } from '../em-homologacao'

describe('EmHomologacaoStatus Handler', () => {
  const procedimento = createMock<ProcedimentoModel>()
  const autor = createMock<ActorModel>()

  const actors = [
    createMock<ActorModel>({
      profile: createMock<ProfileModel>({ nome: 'colegiado' })
    })
  ]

  const repo = createMock<IRepository>({
    findAll: jest.fn().mockResolvedValue(actors)
  })

  const sut = new EmHomologacaoStatusHandler(repo)

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    jest
      .spyOn(MailSender, 'send')
      .mockResolvedValue(createMock<SMTPTransport.SentMessageInfo>())
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return a new status', async () => {
    const mailList = actors.map(actor => actor.email).toString()
    const email = templates['homologacao-colegiado'](mailList, {
      procedimento
    })

    const result = await sut.execute({ procedimento, autor })

    expect(MailSender.send).toBeCalledWith(email)
    expect(repo.findAll).toBeCalledWith({})
    expect(result).toEqual({
      status: 'em_homologacao',
      data: new Date('2020-01-01').toISOString()
    })
  })

  it('shouldn`t send email if there is no actor with this profile', async () => {
    const actors = [
      createMock<ActorModel>({
        profile: createMock<ProfileModel>({ nome: 'admin' })
      })
    ]

    const repo = createMock<IRepository>({
      findAll: jest.fn().mockResolvedValue(actors)
    })

    const sut = new EmHomologacaoStatusHandler(repo)

    await sut.execute({ procedimento, autor })

    expect(MailSender.send).not.toBeCalled()
  })
})
