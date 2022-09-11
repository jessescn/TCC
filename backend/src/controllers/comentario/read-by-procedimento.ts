import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ReadCommentsByProcedimentoController extends Controller {
  constructor(repository: IRepository) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'colegiado_comments'

    super({ permission, validations, repository })
  }

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const comentarios = await this.repository.findAll({ procedimentoId: id })

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
