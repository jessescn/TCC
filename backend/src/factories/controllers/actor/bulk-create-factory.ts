import { BulkCreateActorsController } from 'controllers/actor/bulk-create'
import { makeActorService } from 'factories/services/actor-factory'

export const makeBulkCreateActorsController = () => {
  return new BulkCreateActorsController(makeActorService())
}
