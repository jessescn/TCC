import {
  RemoteNewUsuario,
  UsuarioService
} from 'services/entities/usuario-service'
import { Controller, errorResponseHandler, Validation } from 'controllers'
import {
  actorsPermissions,
  PermissionKey,
  PermissionKeys,
  permissionScopesMap,
  rolesMap
} from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'

const hasOnlyAvailableRoles: Validation = request => {
  const availableRoles = rolesMap

  const { roles } = request.body as RemoteNewUsuario

  if (!roles || roles.length === 0) return

  roles.forEach(role => {
    if (!availableRoles.includes(role)) {
      throw new BadRequestError(`${role} is not a valid user role`)
    }
  })
}

const hasOnlyValidPermissions: Validation = request => {
  const validPermission = Object.keys(actorsPermissions.admin)
  const validScopes = permissionScopesMap

  const { permissoes } = request.body as RemoteNewUsuario

  if (!permissoes || Object.keys(permissoes).length === 0) return

  Object.keys(permissoes).forEach(permissao => {
    if (!validPermission.includes(permissao)) {
      throw new BadRequestError(`${permissao} permission are not supported`)
    }

    const scope = permissoes[permissao]
    if (!validScopes.includes(scope)) {
      throw new BadRequestError(`${scope} scope are not supported`)
    }
  })
}

export class CreateUsuarioController extends Controller {
  constructor() {
    const validations = [hasOnlyAvailableRoles, hasOnlyValidPermissions]
    const permission: PermissionKey = 'user_create'
    const mandatoryFields: (keyof RemoteNewUsuario)[] = [
      'email',
      'nome',
      'senha'
    ]

    super({ mandatoryFields, permission, validations })
  }

  private mergePermissions = (request: Request) => {
    const { permissoes } = request.body as RemoteNewUsuario

    const merged: PermissionKeys = {
      ...actorsPermissions.default,
      ...(permissoes || {})
    }

    return merged
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as RemoteNewUsuario

      const newUsuario = await UsuarioService.create({
        email: data.email,
        nome: data.nome,
        senha: data.senha,
        roles: data.roles,
        permissoes: this.mergePermissions(request)
      })

      response.status(HttpStatusCode.created).send(newUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
