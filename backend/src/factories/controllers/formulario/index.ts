import { makeCreateFormularioController } from './create-factory'
import { makeDeleteFormularioController } from './delete-factory'
import { makeReadFormulariosByTipoController } from './read-by-tipo'
import { makeReadFormularioController } from './read-factory'
import { makeReadOneFormularioController } from './read-one-factory'
import { makeUpdateFormularioController } from './update-factory'

export const createFormularioController = makeCreateFormularioController()
export const readFormularioController = makeReadFormularioController()
export const readOneFormularioController = makeReadOneFormularioController()
export const updateFormularioController = makeUpdateFormularioController()
export const deleteFormularioController = makeDeleteFormularioController()
export const readFormulariosByTipoController =
  makeReadFormulariosByTipoController()
