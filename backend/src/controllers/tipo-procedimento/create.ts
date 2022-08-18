import {
  checkPermissionResource,
  Controller,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { FormularioService } from 'services/entities/formulario-service'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'

export type NewTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  publicos: string[]
  colegiado: boolean
  formularios: number[]
}

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.tipo_procedimento_create
  checkPermissionResource(permission, req)
}

const includesMandatoryFields = (req: Request) => {
  const mandatoryFields = [
    'nome',
    'escopo',
    'colegiado',
    'formularios',
    'publicos'
  ]

  validateMandatoryFields(mandatoryFields, req.body)
}

export class CreateTipoProcedimentoController extends Controller {
  constructor() {
    const validations = [hasPermissions, includesMandatoryFields]
    super(validations)
  }

  checkIfFormulariosExists = async (formulariosIds: number[]) => {
    if (formulariosIds.length === 0) return

    const formularios = await FormularioService.getByIds(formulariosIds)

    if (formularios.length !== formulariosIds.length) {
      throw new NotFoundError('formulario not found')
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data: NewTipoProcedimento = request.body || {}

      await this.checkIfFormulariosExists(data.formularios || [])

      const newTipoProcedimento = await TipoProcedimentoService.create({
        colegiado: data.colegiado,
        escopo: data.escopo,
        formularios: data.formularios,
        nome: data.nome,
        publicos: data.publicos,
        dataFim: data.dataFim,
        dataInicio: data.dataInicio,
        descricao: data.descricao,
        createdBy: request.user.id
      })

      response.status(HttpStatusCode.created).json(newTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
