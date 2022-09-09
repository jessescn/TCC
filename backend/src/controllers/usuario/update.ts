import { Controller, errorResponseHandler, Validation } from 'controllers'
import { UserModel } from 'models/user'
import { IRepository } from 'repository'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import {
  hasNumericId,
  notIncludesInvalidFields
} from 'utils/validations/request'

const notIncludesInvalidUpdateFields: Validation = request => {
  const validFields: (keyof Partial<UserModel>)[] = [
    'senha',
    'nome',
    'email',
    'permissoes',
    'roles',
    'publico'
  ]
  notIncludesInvalidFields(request, validFields)
}

const hasSomeUpdatePayload: Validation = request => {
  const data = request.body

  if (!data) {
    throw new BadRequestError('Empty update payload')
  }
}

export class UpdateUsuarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'user_update'
    const validations = [
      hasNumericId,
      hasSomeUpdatePayload,
      notIncludesInvalidUpdateFields
    ]

    super({ permission, validations, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<UserModel>

      const updatedUsuario = await this.repository.update(Number(id), data)

      response.json(updatedUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
