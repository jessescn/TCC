import { Controller } from 'controllers/controller'
import { makeActorRepository } from 'factories/repositories/actor-factory'
import { ChangePasswordUseCase } from 'usecases/actor/change-password'

export const makeChangePasswordController = () => {
  const usecase = new ChangePasswordUseCase(makeActorRepository())
  const mandatoryFields = ['password', 'code']

  return new Controller({ usecase, mandatoryFields, validations: [] })
}
