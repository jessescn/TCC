import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import {
  hasNumericId,
  notIncludesInvalidFields
} from 'utils/validations/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = ['conteudo', 'procedimentoId']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateComentarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'comentario_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission, repository })
  }

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body

      const updatedComentario = await this.repository.update(Number(id), data)

      response.json(updatedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
