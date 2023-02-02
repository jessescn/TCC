import { Controller } from 'controllers/controller'
import { SendAccountVerificationEmailUseCase } from 'usecases/actor/send-account-verification-email'

export const makeSendAccountVerificationEmailUseCaseController = () => {
  const usecase = new SendAccountVerificationEmailUseCase()

  return new Controller({ usecase, validations: [], mandatoryFields: [] })
}
