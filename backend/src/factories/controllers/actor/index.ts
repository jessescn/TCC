import { makeCreateActorController } from './create-factory'
import { makeDeleteActorController } from './delete-factory'
import { makePublicosController } from './publicos-factory'
import { makeReadActorController } from './read-factory'
import { makeReadOneActorController } from './read-one-factory'
import { makeSidebarInfoController } from './sidebar-factory'
import { makeUpdateActorController } from './update-factory'

export const createActorController = makeCreateActorController()
export const readActorController = makeReadActorController()
export const readOneActorController = makeReadOneActorController()
export const updateActorController = makeUpdateActorController()
export const deleteActorController = makeDeleteActorController()
export const publicosController = makePublicosController()
export const sidebarInfoController = makeSidebarInfoController()
