import { Controller } from 'controllers/controller'
import { makeActorRepository } from 'factories/repositories/actor-factory'
import { SendChangePasswordEmailUseCase } from 'usecases/actor/send-change-password-email'

export const makeSendChangePasswordEmailController = () => {
  const usecase = new SendChangePasswordEmailUseCase(makeActorRepository())

  return new Controller({
    usecase,
    mandatoryFields: ['email'],
    validations: []
  })
}
