import { makeSendAccountVerificationEmailUseCaseController } from './send-account-verification-email-factory'
import { makeBulkCreateActorsController } from './bulk-create-factory'
import { makeChangePasswordController } from './change-password-factory'
import { makeAccountVerificationController } from './account-verification-factory'
import { makeCreateActorController } from './create-factory'
import { makeDeleteActorController } from './delete-factory'
import { makeActorsPublicosController } from './actors-publicos-factory'
import { makeReadActorController } from './read-factory'
import { makeReadOneActorController } from './read-one-factory'
import { makeSendChangePasswordEmailController } from './send-change-password-email-factory'
import { makeActorSidebarController } from './sidebar-factory'
import { makeUpdateActorController } from './update-factory'

export const createActorController = makeCreateActorController()
export const readActorController = makeReadActorController()
export const readOneActorController = makeReadOneActorController()
export const updateActorController = makeUpdateActorController()
export const deleteActorController = makeDeleteActorController()
export const actorsPublicosController = makeActorsPublicosController()
export const actorSidebarController = makeActorSidebarController()
export const bulkCreateActorsController = makeBulkCreateActorsController()
export const changePasswordController = makeChangePasswordController()
export const AccountVerificationController = makeAccountVerificationController()
export const sendAccountVerificationEmailUseCaseController =
  makeSendAccountVerificationEmailUseCaseController()
export const sendChangePasswordEmailController =
  makeSendChangePasswordEmailController()
