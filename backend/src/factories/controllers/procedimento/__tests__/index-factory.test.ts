import { CreateProcedimentoController } from 'controllers/procedimento/create'
import { DeleteProcedimentoController } from 'controllers/procedimento/delete'
import { HomologateProcedimentoController } from 'controllers/procedimento/homologate'
import { ReadProcedimentoController } from 'controllers/procedimento/read'
import { ReadOneProcedimentoController } from 'controllers/procedimento/read-one'
import { ReviewProcedimentoController } from 'controllers/procedimento/review'
import { UpdateProcedimentoController } from 'controllers/procedimento/update'
import { UpdateStatusProcedimentoController } from 'controllers/procedimento/update-status'
import {
  createProcedimentoController,
  deleteProcedimentoController,
  homologateProcedimentoController,
  readOneProcedimentoController,
  readProcedimentoController,
  reviewProcedimentoController,
  updateProcedimentoController,
  updateStatusProcedimentoController
} from '..'

describe('Procedimento Controller Factories', () => {
  it('should create a instance of CreateProcedimentoController', () => {
    expect(createProcedimentoController).toBeInstanceOf(
      CreateProcedimentoController
    )
  })

  it('should create a instance of DeleteProcedimentoController', () => {
    expect(deleteProcedimentoController).toBeInstanceOf(
      DeleteProcedimentoController
    )
  })

  it('should create a instance of HomologateProcedimentoController', () => {
    expect(homologateProcedimentoController).toBeInstanceOf(
      HomologateProcedimentoController
    )
  })

  it('should create a instance of ReadProcedimentoController', () => {
    expect(readProcedimentoController).toBeInstanceOf(
      ReadProcedimentoController
    )
  })

  it('should create a instance of ReadOneProcedimentoController', () => {
    expect(readOneProcedimentoController).toBeInstanceOf(
      ReadOneProcedimentoController
    )
  })

  it('should create a instance of ReviewProcedimentoController', () => {
    expect(reviewProcedimentoController).toBeInstanceOf(
      ReviewProcedimentoController
    )
  })

  it('should create a instance of UpdateProcedimentoController', () => {
    expect(updateProcedimentoController).toBeInstanceOf(
      UpdateProcedimentoController
    )
  })

  it('should create a instance of UpdateStatusProcedimentoController', () => {
    expect(updateStatusProcedimentoController).toBeInstanceOf(
      UpdateStatusProcedimentoController
    )
  })
})
