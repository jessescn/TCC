import { Controller, errorResponseHandler, Validation } from 'controllers'
import { CreateUsuario } from 'repository/sequelize/usuario'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey, rolesMap } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'

const hasOnlyAvailableRoles: Validation = request => {
  const availableRoles = rolesMap

  const { roles } = request.body as CreateUsuario

  if (!roles || roles.length === 0) return

  roles.forEach(role => {
    if (!availableRoles.includes(role)) {
      throw new BadRequestError(`${role} is not a valid user role`)
    }
  })
}
export class CreateUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const validations = [hasOnlyAvailableRoles]
    const permission: PermissionKey = 'user_create'
    const mandatoryFields = ['email', 'nome', 'senha']

    super({ mandatoryFields, permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as CreateUsuario

      const newUsuario = await this.service.create({
        email: data.email,
        nome: data.nome,
        senha: data.senha,
        roles: data.roles,
        permissoes: data.permissoes
      })

      response.status(HttpStatusCode.created).send(newUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
