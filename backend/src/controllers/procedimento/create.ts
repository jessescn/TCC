import { Controller, errorResponseHandler } from 'controllers'
import { Resposta } from 'models/procedimento'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export type NewProcedimento = {
  tipo: number
  respostas: Resposta[]
}

export class CreateProcedimentoController extends Controller {
  constructor() {
    const mandatoryFields: (keyof NewProcedimento)[] = ['tipo', 'respostas']
    const permission: PermissionKey = 'procedimento_create'

    super({ permission, mandatoryFields })
  }

  private callServiceToCreateProcedimento = (request: Request) => {
    const data = request.body as NewProcedimento

    return ProcedimentoService.create({
      respostas: data.respostas,
      tipo: data.tipo,
      createdBy: request.user.id,
      votos: []
    })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const procedimento = await this.callServiceToCreateProcedimento(request)

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
