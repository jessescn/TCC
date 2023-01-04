import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { MailSender } from 'repositories/nodemailer/mail'
import { createMock } from 'ts-auto-mock'
import { DeferidoStatusHandler } from '../deferido'

describe('DeferidoStatus Handler', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    jest
      .spyOn(MailSender, 'send')
      .mockResolvedValue(createMock<SMTPTransport.SentMessageInfo>())
  })

  const sut = new DeferidoStatusHandler()

  it('should return a new status', async () => {
    const result = await sut.execute()

    expect(result).toEqual({
      status: 'deferido',
      data: new Date('2020-01-01').toISOString()
    })
  })
})
