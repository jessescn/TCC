import { ActorModel } from 'domain/models/actor'
import { MailSender } from 'repositories/nodemailer/mail'
import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { SendAccountVerificationEmailUseCase } from '../send-account-verification-email'

describe('SendAccountVerificationEmail UseCase', () => {
  const actor = createMock<ActorModel>({ verificado: false })
  const verifiedActor = createMock<ActorModel>({ verificado: true })

  it('should send account verification email', async () => {
    const mailSenderSpy = jest.spyOn(MailSender, 'send')
    const request = createMock<Request>({ actor })
    const sut = new SendAccountVerificationEmailUseCase()

    await sut.execute(request)

    expect(mailSenderSpy).toBeCalled()
  })

  it('should throw BadRequestError if actor is verified already', async () => {
    const request = createMock<Request>({ actor: verifiedActor })
    const sut = new SendAccountVerificationEmailUseCase()

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(BadRequestError)
  })
})
