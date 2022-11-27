import { ChangePasswordController } from 'controllers/actor/change-password'
import { makeActorService } from 'factories/services/actor-factory'

export const makeChangePasswordController = () => {
  return new ChangePasswordController(makeActorService())
}
