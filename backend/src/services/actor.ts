import { ActorHelper } from 'domain/helpers/actor'
import { ActorModel } from 'domain/models/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { Pagination } from 'repositories'
import {
  ActorQuery,
  ActorRepository,
  NewActor
} from 'repositories/sequelize/actor'
import { ProfileRepository } from 'repositories/sequelize/profile'
import { TipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { IService } from 'services'
import { ConflictError, NotFoundError } from 'types/express/errors'
import { paginateList } from 'utils/value'

export type SidebarInfo = {
  open: TipoProcedimentoModel[]
}

export interface IActorService extends IService<ActorModel, ActorQuery> {
  create: (data: NewActor) => Promise<ActorModel>
  update: (id: number, data: Partial<ActorModel>) => Promise<ActorModel>
  getPublicos: () => Promise<string[]>
  getSidebarInfo: (actorId: number) => Promise<SidebarInfo>
}

export class ActorService implements IActorService {
  constructor(
    private readonly repository: ActorRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly tipoProcedimentoRepo: TipoProcedimentoRepository
  ) {}

  private checkIfUserAlreadyExistsByEmail = async (email: string) => {
    const [actor] = await this.repository.findAll({ email })

    if (actor) {
      throw new ConflictError('Usuário já existe')
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

    const actor = await this.repository.create({
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      profile: profile.id
    })

    return actor
  }

  async delete(id: number) {
    await this.checkIfUserAlreadyExists(id)

    return this.repository.destroy(id)
  }

  async findOne(id: number) {
    const actor = await this.checkIfUserAlreadyExists(id)

    return actor
  }

  async findAll(query: ActorQuery, pagination: Pagination) {
    const usuarios = await this.repository.findAll(query, pagination.term)

    const paginated = paginateList(usuarios, pagination)

    return {
      total: usuarios.length,
      data: paginated
    }
  }

  async update(id: number, data: Partial<ActorModel>) {
    await this.checkIfUserAlreadyExists(id)

    return this.repository.update(id, data)
  }

  async getPublicos() {
    const { data } = await this.findAll(
      {},
      { page: 1, per_page: 1000, term: null }
    )

    return ActorHelper.getPublicos(data)
  }

  async getSidebarInfo(id: number) {
    const actor = (await this.checkIfUserAlreadyExists(id)) as ActorModel
    const publicos = actor.publico

    const activeTipos = await this.tipoProcedimentoRepo.findAll({
      status: 'ativo',
      deleted: false
    })

    const openedTipos = activeTipos.filter(tipo => {
      const startDate = new Date(tipo.dataInicio || '01-01-1999')
      const endDate = new Date(tipo.dataFim || '01-01-2999')
      const currentDate = new Date()

      const intersection = tipo.publicos.filter(publico =>
        publicos.includes(publico)
      )

      const isInInterval = startDate <= currentDate && endDate >= currentDate
      const isInPublicos = tipo.publicos.length === 0 || intersection.length > 0

      return isInInterval && isInPublicos
    })

    return {
      open: openedTipos
    }
  }
}
