import { CreateUsuarioController } from './create'
import { DeleteUsuarioController } from './delete'
import { PublicosUsuarioController } from './publicos'
import { ReadUsuarioController } from './read'
import { ReadOneUsuarioController } from './read-one'
import { UpdateUsuarioController } from './update'

export const createUsuarioController = new CreateUsuarioController()
export const readUsuarioController = new ReadUsuarioController()
export const readOneUsuarioController = new ReadOneUsuarioController()
export const updateUsuarioController = new UpdateUsuarioController()
export const deleteUsuarioController = new DeleteUsuarioController()
export const publicosUsuarioController = new PublicosUsuarioController()
