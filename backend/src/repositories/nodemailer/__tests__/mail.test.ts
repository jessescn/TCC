import { SentMessageInfo } from 'nodemailer'
import { EmailTemplate } from 'templates'
import { createMock } from 'ts-auto-mock'
import { MailSender } from '../mail'

jest.mock('repositories/nodemailer/mail', () => {
  return {
    ...jest.requireActual('repositories/nodemailer/mail')
  }
})
describe('MailSender', () => {
  const template = createMock<EmailTemplate>()

  const infoMock = createMock<SentMessageInfo>()
  const transporterMock = {
    sendMail: jest.fn().mockResolvedValue(infoMock)
  }

  const sut = MailSender

  sut.transporter = transporterMock as any

  it('should send a email using the provided template', async () => {
    const result = await sut.send(template)

    expect(result).toEqual(infoMock)

    expect(process.env.MAIL_TRANSPORTER_USER).toEqual('user@mail.com')
    expect(process.env.MAIL_TRANSPORTER_PASSWORD).toEqual('password')

    expect(sut.transporter.sendMail).toBeCalledWith({
      ...template,
      from: process.env.MAIL_TRANSPORTER_USER
    })
  })
})
