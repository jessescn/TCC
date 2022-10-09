import { ActorAttributes, ActorModel } from 'domain/models/actor'
import { IRepository } from 'repository'
import { NewActor, ActorQuery } from 'repository/sequelize/actor'
import { IService } from 'services'
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from 'types/express/errors'
import { ActorUseCase } from 'domain/usecases/actor'
import { ProfileRepository } from 'repository/sequelize/profile'

export interface IActorService extends IService<ActorAttributes, ActorQuery> {
  create: (data: NewActor) => Promise<ActorAttributes>
  update: (id: number, data: Partial<ActorModel>) => Promise<ActorAttributes>
  getPublicos: () => Promise<string[]>
}

export class ActorService implements IActorService {
  constructor(
    private readonly repository: IRepository,
    private readonly profileRepo: ProfileRepository
  ) {}

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

  private checkIfProfileExists = async (profileId: number) => {
    const profile = await this.profileRepo.findOne(profileId)

    if (!profile) {
      throw new BadRequestError('Invalid profile')
    }
  }

  async create(data: NewActor) {
    await this.checkIfUserAlreadyExistsByEmail(data.email)
    await this.checkIfProfileExists(data.profile)

    const usuario = await this.repository.create({
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      permissoes: data.profile
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

  async findAll(query: ActorQuery = {}) {
    return this.repository.findAll(query)
  }

  async update(id: number, data: Partial<ActorModel>) {
    await this.checkIfUserAlreadyExists(id)

    return this.repository.update(id, data)
  }

  async getPublicos() {
    const usuarios = await this.findAll()

    return ActorUseCase.getPublicos(usuarios)
  }
}
