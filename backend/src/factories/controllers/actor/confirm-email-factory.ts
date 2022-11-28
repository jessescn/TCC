import { ConfirmEmailController } from 'controllers/actor/confirm-email'
import { makeActorService } from 'factories/services/actor-factory'

export const makeConfirmEmailController = () => {
  return new ConfirmEmailController(makeActorService())
}
