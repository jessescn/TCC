import { Controller, errorResponseHandler, Validation } from 'controllers'
import { UserModel } from 'models/user'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields: Validation = request => {
  const validFields: (keyof Partial<UserModel>)[] = [
    'nome',
    'permissoes',
    'roles',
    'publico'
  ]
  notIncludesInvalidFields(request, validFields)
}

export class UpdateUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const permission: PermissionKey = 'user_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<UserModel>

      const updatedUsuario = await this.service.update(Number(id), data)

      response.json(updatedUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
