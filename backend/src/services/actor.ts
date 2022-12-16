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
import templates from 'templates'
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { paginateList } from 'utils/value'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { MailSender } from 'repositories/nodemailer/mail'
import { encryptPassword } from 'utils/password'

export type SidebarInfo = {
  open: TipoProcedimentoModel[]
}

export interface IActorService extends IService<ActorModel, ActorQuery> {
  create: (data: NewActor) => Promise<ActorModel>
  bulkCreate: (filepath: string) => Promise<ActorModel[]>
  update: (id: number, data: Partial<ActorModel>) => Promise<ActorModel>
  getPublicos: () => Promise<string[]>
  getSidebarInfo: (actorId: number) => Promise<SidebarInfo>
  sendConfirmationCode: (data: ActorModel) => Promise<void>
  confirmEmailByCode: (code: string) => Promise<ActorModel>
  sendChangePasswordEmail: (email: string) => Promise<void>
  changePassword: (code: string, password: string) => Promise<void>
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

    await this.sendConfirmationCode(actor, '1000d')

    return actor
  }

  async bulkCreate(filename: string) {
    const [baseProfile] = await this.getBaseProfile()
    const profiles = await this.profileRepo.findAll()

    const data = await ActorHelper.parserCSV(filename, profiles, baseProfile)
    const emails = data.map(value => value.email)

    const actorsAlreadyExisted = await this.repository.findAll({
      email: emails
    })

    if (actorsAlreadyExisted.length > 0) {
      const existentEmails = actorsAlreadyExisted.map(actor => actor.email)

      throw new ConflictError(
        `Os seguintes emails já existem: ${existentEmails}`
      )
    }

    const createPromises = []

    data.forEach(newActor => {
      const promise = new Promise((resolve, reject) => {
        this.repository
          .create({
            email: newActor.email,
            nome: newActor.nome,
            senha: 'default123',
            profile: newActor.profile,
            publico: newActor.publico
          })
          .then(actor => resolve(actor))
          .catch(error => reject(error))
      })
      createPromises.push(promise)
    })

    const result = await Promise.all(createPromises)

    return result
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

  async sendConfirmationCode(data: ActorModel, expiration = '5m') {
    if (data.verificado) {
      throw new BadRequestError('Usuário com email já verificado')
    }

    const token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
      expiresIn: expiration
    })
    const baseUrl = process.env.WEB_URL || 'http://localhost:3000'
    const link = `${baseUrl}/confirmacao-email/${token}`

    const template = templates['verificacao-email']
    const email = template(data.email, { link })

    await MailSender.send(email)
  }

  async confirmEmailByCode(code: string) {
    let email: string | undefined

    try {
      const { payload } = jwt.verify(code, process.env.JWT_SECRET_KEY, {
        complete: true
      }) as JwtPayload

      email = payload?.data?.email
    } catch (error) {
      throw new UnauthorizedError('Código inválido ou expirado!')
    }

    if (!email) {
      throw new BadRequestError('Codigo inválido')
    }

    const [actor] = await this.repository.findAll({ email })

    if (!actor) {
      throw new NotFoundError('Usuário não encontrado')
    }

    return this.update(actor.id, { verificado: true })
  }

  async sendChangePasswordEmail(email: string) {
    const [actor] = await this.repository.findAll({ email })

    if (!actor) {
      throw new NotFoundError('Não existe usuário com esse email')
    }

    const code = jwt.sign({ actor }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })
    const baseUrl = process.env.WEB_URL || 'http://localhost:3000'
    const link = `${baseUrl}/alteracao-senha/${code}?email=${actor.email}`

    const emailTemplate = templates['change-password'](email, {
      link,
      name: actor.nome
    })

    await MailSender.send(emailTemplate)
  }

  async changePassword(code: string, newPassword: string) {
    let email: string | undefined

    try {
      const { payload } = jwt.verify(code, process.env.JWT_SECRET_KEY, {
        complete: true
      }) as JwtPayload

      email = payload?.actor?.email
    } catch (error) {
      throw new UnauthorizedError('Código inválido ou expirado!')
    }

    if (!email) {
      throw new BadRequestError('Codigo inválido')
    }

    const [actor] = await this.repository.findAll({ email })

    if (!actor) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const encrypted = await encryptPassword(newPassword)

    await this.repository.update(actor.id, { senha: encrypted })
  }
}
