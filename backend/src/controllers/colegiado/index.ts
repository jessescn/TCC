import { Controller, ControllerProps } from 'controllers'
import { ProcedimentoAttributes } from 'domain/models/procedimento'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { Request, Response } from 'types/express'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { ProcedimentoUseCase } from 'domain/usecases/procedimento'

export type VoteControllerProps = ControllerProps & {
  repository: ProcedimentoRepository
}

export class VoteController extends Controller {
  protected repository: ProcedimentoRepository

  private checkIfProcedimentoIsOnHomologation = async (
    procedimento: ProcedimentoAttributes
  ) => {
    const status = ProcedimentoUseCase.getCurrentStatus(procedimento)

    if (status !== 'em_homologacao') {
      throw new BadRequestError('Cannot homologate from this current status.')
    }
  }

  private checkIfProcedimentoExists = async (
    procedimento?: ProcedimentoAttributes
  ) => {
    if (!procedimento) {
      throw new NotFoundError()
    }
  }

  protected checkIfProcedimentoCanUpdate = async (request: Request) => {
    const { id } = request.params

    const procedimento = await this.repository.findOne(Number(id))

    this.checkIfProcedimentoExists(procedimento)
    this.checkIfProcedimentoIsOnHomologation(procedimento)
  }

  exec = async (request: Request, response: Response) => {
    return null
  }
}
