import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

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

  private checkIfComentarioExists = async (id: number) => {
    const comentario = await this.repository.findOne(id)

    if (!comentario) {
      throw new NotFoundError('comentario does not exists')
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body

      await this.checkIfComentarioExists(Number(id))

      const updatedComentario = await this.repository.update(Number(id), data)

      response.json(updatedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
