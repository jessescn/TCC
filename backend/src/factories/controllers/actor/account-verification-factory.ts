import { Controller } from 'controllers/controller'
import { makeActorRepository } from 'factories/repositories/actor-factory'
import { AccountVerificationUseCase } from 'usecases/actor/account-verification'

export const makeAccountVerificationController = () => {
  const usecase = new AccountVerificationUseCase(makeActorRepository())

  return new Controller({ usecase, mandatoryFields: ['code'], validations: [] })
}
