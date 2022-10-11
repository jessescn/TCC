import { CreateFormularioController } from 'controllers/formulario/create'
import { DeleteFormularioController } from 'controllers/formulario/delete'
import { ReadFormularioController } from 'controllers/formulario/read'
import { ReadOneFormularioController } from 'controllers/formulario/read-one'
import { UpdateFormularioController } from 'controllers/formulario/update'
import {
  createFormularioController,
  deleteFormularioController,
  readFormularioController,
  readOneFormularioController,
  updateFormularioController
} from '..'

describe('Formulario Controller Factories', () => {
  it('should create a instance of CreateFormularioController', () => {
    expect(createFormularioController).toBeInstanceOf(
      CreateFormularioController
    )
  })

  it('should create a instance of DeleteFormularioController', () => {
    expect(deleteFormularioController).toBeInstanceOf(
      DeleteFormularioController
    )
  })

  it('should create a instance of ReadFormularioController', () => {
    expect(readFormularioController).toBeInstanceOf(ReadFormularioController)
  })

  it('should create a instance of ReadOneFormularioController', () => {
    expect(readOneFormularioController).toBeInstanceOf(
      ReadOneFormularioController
    )
  })

  it('should create a instance of UpdateFormularioController', () => {
    expect(updateFormularioController).toBeInstanceOf(
      UpdateFormularioController
    )
  })
})
