import { Controller } from 'controllers/controller'
import { makeActorRepository } from 'factories/repositories/actor-factory'
import { TokenUseCase } from 'usecases/authentication/token'

export const makeTokenController = () => {
  const usecase = new TokenUseCase(makeActorRepository())

  return new Controller({
    usecase,
    mandatoryFields: ['email', 'senha'],
    validations: []
  })
}
