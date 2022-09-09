import { makeCreateUsuarioController } from './create-factory'
import { makeDeleteUsuarioController } from './delete-factory'
import { makePublicosUsuarioController } from './publicos-factory'
import { makeReadUsuarioController } from './read-factory'
import { makeReadOneUsuarioController } from './read-one-factory'
import { makeUpdateUsuarioController } from './update-factory'

export const createUsuarioController = makeCreateUsuarioController()
export const readUsuarioController = makeReadUsuarioController()
export const readOneUsuarioController = makeReadOneUsuarioController()
export const updateUsuarioController = makeUpdateUsuarioController()
export const deleteUsuarioController = makeDeleteUsuarioController()
export const publicosUsuarioController = makePublicosUsuarioController()
