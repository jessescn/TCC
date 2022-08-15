import {
  checkIncludesInvalidFields,
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export const validators = {
  hasPermissions: (req: Request) => {
    const permission = req.user.permissoes.comentario_update
    checkPermissionResource(permission, req)
  },
  hasNumericId: (req: Request) => {
    const { id } = req.params

    if (!isNumber(id)) {
      throw new BadRequestError()
    }
  },
  notIncludesInvalidFields: (req: Request) => {
    const validFields = ['conteudo', 'procedimentoId']
    const includesInvalidFields = checkIncludesInvalidFields(
      validFields,
      req.body
    )

    if (includesInvalidFields) {
      throw new BadRequestError()
    }
  }
}

export function UpdateComentarioController(): Controller {
  const validateRequest = (req: Request) => {
    validators.hasPermissions(req)
    validators.notIncludesInvalidFields(req)
    validators.hasNumericId(req)
  }

  return {
    exec: async (request: Request, response: Response) => {
      try {
        validateRequest(request)

        const { id } = request.params
        const data = request.body

        const updatedComentario = await ComentarioService.update(
          Number(id),
          data
        )

        response.json(updatedComentario)
      } catch (error) {
        errorResponseHandler(response, error)
      }
    }
  }
}
