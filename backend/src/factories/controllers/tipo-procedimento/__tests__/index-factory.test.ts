import { CreateTipoProcedimentoController } from 'controllers/tipo-procedimento/create'
import { DeleteTipoProcedimentoController } from 'controllers/tipo-procedimento/delete'
import { ReadTipoProcedimentoController } from 'controllers/tipo-procedimento/read'
import { ReadOneTipoProcedimentoController } from 'controllers/tipo-procedimento/read-one'
import { UpdateTipoProcedimentoController } from 'controllers/tipo-procedimento/update'
import {
  createTipoProcedimentoController,
  deleteTipoProcedimentoController,
  readOneTipoProcedimentoController,
  readTipoProcedimentoController,
  updateTipoProcedimentoController
} from '..'

describe('TipoProcedimento Controller Factories', () => {
  it('should create a instance of CreateTipoProcedimentoController', () => {
    expect(createTipoProcedimentoController).toBeInstanceOf(
      CreateTipoProcedimentoController
    )
  })

  it('should create a instance of DeleteTipoProcedimentoController', () => {
    expect(deleteTipoProcedimentoController).toBeInstanceOf(
      DeleteTipoProcedimentoController
    )
  })

  it('should create a instance of ReadTipoProcedimentoController', () => {
    expect(readTipoProcedimentoController).toBeInstanceOf(
      ReadTipoProcedimentoController
    )
  })

  it('should create a instance of ReadOneTipoProcedimentoController', () => {
    expect(readOneTipoProcedimentoController).toBeInstanceOf(
      ReadOneTipoProcedimentoController
    )
  })

  it('should create a instance of UpdateTipoProcedimentoController', () => {
    expect(updateTipoProcedimentoController).toBeInstanceOf(
      UpdateTipoProcedimentoController
    )
  })
})
