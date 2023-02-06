import { Controller } from 'controllers/controller'
import { PermissionKey } from 'domain/profiles'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { ActorSidebarUseCase } from 'usecases/actor/actor-sidebar'

export const makeActorSidebarController = () => {
  const usecase = new ActorSidebarUseCase(makeTipoProcedimentoRepository())
  const permission: PermissionKey = 'actor_read'

  return new Controller({
    usecase,
    mandatoryFields: [],
    validations: [],
    permission
  })
}
