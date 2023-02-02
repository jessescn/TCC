import { ActorModel } from 'domain/models/actor'
import { MailSender } from 'repositories/nodemailer/mail'
import { IActorRepository } from 'repositories/sequelize/actor'
import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { SendChangePasswordEmailUseCase } from '../send-change-password-email'
describe('SendChangePasswordEmail UseCase', () => {
  const actor = createMock<ActorModel>()

  it('should send change password email', async () => {
    const mailSenderSpy = jest.spyOn(MailSender, 'send')
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([actor])
    })
    const request = createMock<Request>({ body: { email: actor.email } })
    const sut = new SendChangePasswordEmailUseCase(repo)

    await sut.execute(request)

    expect(mailSenderSpy).toBeCalled()
  })

  it('should throw NotFoundError if actor not found', async () => {
    const repo = createMock<IActorRepository>({
      findAll: jest.fn().mockResolvedValue([])
    })
    const request = createMock<Request>({ body: { email: actor.email } })
    const sut = new SendChangePasswordEmailUseCase(repo)

    const shouldThrow = async () => {
      await sut.execute(request)
    }

    await expect(shouldThrow).rejects.toThrow(NotFoundError)
  })
})
