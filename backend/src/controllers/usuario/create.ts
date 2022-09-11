import { Controller, errorResponseHandler, Validation } from 'controllers'
import {
  actorsPermissions,
  PermissionKey,
  PermissionKeys,
  permissionScopesMap,
  rolesMap
} from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError, ConflictError } from 'types/express/errors'
import { IRepository } from 'repository'
import { CreateUsuario, UsuarioRepository } from 'repository/sequelize/usuario'

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

const hasOnlyValidPermissions: Validation = request => {
  const validPermission = Object.keys(actorsPermissions.admin)
  const validScopes = permissionScopesMap

  const { permissoes } = request.body as CreateUsuario

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
  constructor(repository: IRepository) {
    const validations = [hasOnlyAvailableRoles, hasOnlyValidPermissions]
    const permission: PermissionKey = 'user_create'
    const mandatoryFields = ['email', 'nome', 'senha']

    super({ mandatoryFields, permission, validations, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  private mergePermissions = (request: Request) => {
    const { permissoes } = request.body as CreateUsuario

    const merged: PermissionKeys = {
      ...actorsPermissions.default,
      ...(permissoes || {})
    }

    return merged
  }

  checkIfUserAlreadyExists = async (email: string) => {
    const [usuario] = await this.repository.findAll({ email })

    if (usuario) {
      throw new ConflictError('user already exists')
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as CreateUsuario

      await this.checkIfUserAlreadyExists(data.email)

      const newUsuario = await this.repository.create({
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
