import { ProfileModel } from 'domain/models/profile'
import { Permissions } from 'domain/profiles'
import { IRepository } from 'repository'
import { ProfileQuery } from 'repository/sequelize/profile'
import { IService } from 'services'
import { ConflictError, NotFoundError } from 'types/express/errors'

interface CreateProfile {
  nome: string
  permissoes: Permissions
}

export type NewProfile = CreateProfile

export interface IProfileService extends IService<ProfileModel, ProfileQuery> {
  create: (data: NewProfile) => Promise<ProfileModel>
  update: (id: number, data: Partial<ProfileModel>) => Promise<ProfileModel>
}

export class ProfileService implements IProfileService {
  constructor(private readonly repository: IRepository) {}

  private async checkIfProfileNameAlreadyExists(nome: string) {
    const [profile] = await this.repository.findAll({ nome, deleted: false })

    if (profile) {
      throw new ConflictError('Profile already exists')
    }
  }

  private async checkIfProfileAlreadyExists(id: number) {
    const profile = await this.repository.findOne(id)

    if (!profile) {
      throw new NotFoundError()
    }

    return profile
  }

  async create(data: NewProfile) {
    await this.checkIfProfileNameAlreadyExists(data.nome)

    const profile = await this.repository.create({
      nome: data.nome,
      permissoes: data.permissoes
    })

    return profile
  }

  async findOne(id: number) {
    return this.checkIfProfileAlreadyExists(id)
  }

  async findAll(query: ProfileQuery = {}) {
    return this.repository.findAll(query)
  }

  async delete(id: number) {
    await this.checkIfProfileAlreadyExists(id)

    return this.repository.destroy(id)
  }

  async update(id: number, data: Partial<ProfileModel>) {
    await this.checkIfProfileAlreadyExists(id)

    return this.repository.update(id, data)
  }
}
