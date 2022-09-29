import { UserAttributes, UserModel } from 'domain/models/user'
import { IRepository } from 'repository'
import {
  NewUsuario,
  UsuarioQuery,
  UsuarioRepository
} from 'repository/sequelize/usuario'
import { IService } from 'services'
import { ConflictError, NotFoundError } from 'types/express/errors'
import { UsuarioUseCase } from 'domain/usecases/usuario'

export interface IUsuarioService
  extends IService<UserAttributes, UsuarioQuery> {
  create: (data: NewUsuario) => Promise<UserAttributes>
  update: (id: number, data: Partial<UserModel>) => Promise<UserAttributes>
  getPublicos: () => Promise<string[]>
}

export class UsuarioService implements IUsuarioService {
  private repository: UsuarioRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  private checkIfUserAlreadyExistsByEmail = async (email: string) => {
    const [usuario] = await this.repository.findAll({ email })

    if (usuario) {
      throw new ConflictError('user already exists')
    }
  }

  private checkIfUserAlreadyExists = async (id: number) => {
    const usuario = await this.repository.findOne(id)

    if (!usuario) {
      throw new NotFoundError()
    }

    return usuario
  }

  async create(data: NewUsuario) {
    await this.checkIfUserAlreadyExistsByEmail(data.email)

    const usuario = await this.repository.create({
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      roles: data.roles,
      permissoes: data.permissoes
    })

    return usuario
  }

  async delete(id: number) {
    await this.checkIfUserAlreadyExists(id)

    return this.repository.destroy(id)
  }

  async findOne(id: number) {
    const usuario = await this.checkIfUserAlreadyExists(id)

    return usuario
  }

  async findAll(query: UsuarioQuery = {}) {
    return this.repository.findAll(query)
  }

  async update(id: number, data: Partial<UserModel>) {
    await this.checkIfUserAlreadyExists(id)

    return this.repository.update(id, data)
  }

  async getPublicos() {
    const usuarios = await this.findAll()

    return UsuarioUseCase.getPublicos(usuarios)
  }
}
