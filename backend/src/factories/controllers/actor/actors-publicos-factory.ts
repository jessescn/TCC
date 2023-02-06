import { Controller } from 'controllers/controller'
import { makeActorRepository } from 'factories/repositories/actor-factory'
import { ActorsPublicosUseCase } from 'usecases/actor/actors-publicos'

export const makeActorsPublicosController = () => {
  const usecase = new ActorsPublicosUseCase(makeActorRepository())

  return new Controller({ usecase, mandatoryFields: [], validations: [] })
}
