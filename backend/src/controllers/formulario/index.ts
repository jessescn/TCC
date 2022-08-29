import { CreateFormularioController } from './create'
import { DeleteFormularioController } from './delete'
import { ReadFormularioController } from './read'
import { ReadOneFormularioController } from './read-one'
import { UpdateFormularioController } from './update'

export const createFormularioController = new CreateFormularioController()
export const readFormularioController = new ReadFormularioController()
export const readOneFormularioController = new ReadOneFormularioController()
export const updateFormularioController = new UpdateFormularioController()
export const deleteFormularioController = new DeleteFormularioController()
