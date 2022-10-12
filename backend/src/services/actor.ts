import { ActorAttributes, ActorModel } from 'domain/models/actor'
import { IRepository } from 'repository'
import { NewActor, ActorQuery } from 'repository/sequelize/actor'
import { IService } from 'services'
import { ConflictError, NotFoundError } from 'types/express/errors'
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
    const [actor] = await this.repository.findAll({ email })

    if (actor) {
      throw new ConflictError('user already exists')
    }
  }

  private checkIfUserAlreadyExists = async (id: number) => {
    const actor = await this.repository.findOne(id)

    if (!actor) {
      throw new NotFoundError()
    }

    return actor
  }

  private getBaseProfile = async () => {
    return this.profileRepo.findAll({ nome: 'usuario' })
  }

  async create(data: NewActor) {
    await this.checkIfUserAlreadyExistsByEmail(data.email)
    const [profile] = await this.getBaseProfile()

    const usuario = await this.repository.create({
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      permissoes: profile.id
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
