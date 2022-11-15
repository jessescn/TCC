import { SidebarInfoController } from 'controllers/actor/sidebar'
import { makeActorService } from 'factories/services/actor-factory'

export const makeSidebarInfoController = () => {
  return new SidebarInfoController(makeActorService())
}
