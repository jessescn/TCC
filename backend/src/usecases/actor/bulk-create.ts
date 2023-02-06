import { ProfileModel } from 'domain/models/profile'
import { IProfileRepository } from 'repositories/sequelize/profile'
import { Request } from 'types/express'
import { UseCase } from 'usecases'
import * as fs from 'fs'
import * as csv from 'fast-csv'
import { removeFile } from 'utils/file'
import { IActorRepository } from 'repositories/sequelize/actor'
import { ConflictError } from 'types/express/errors'
import { ActorModel } from 'domain/models/actor'

type ActorRow = {
  nome: string
  email: string
  profile: number
  publico: string[]
}

export class BulkCreateUseCase implements UseCase {
  constructor(
    private profileRepo: IProfileRepository,
    private actorRepo: IActorRepository
  ) {}

  private fetchAllProfiles = async () => {
    return this.profileRepo.findAll()
  }

  private findBaseProfile = (profiles: ProfileModel[]) => {
    return profiles.find(profile => profile.nome === 'usuario')
  }

  private getProfileByName = (
    profileName: string,
    profiles: ProfileModel[],
    baseProfile: ProfileModel
  ) => {
    const profile = profiles.find(profile => profile.nome === profileName)

    return profile || baseProfile
  }

  private parserActorsCSV = async (
    filename: string,
    profiles: ProfileModel[],
    baseProfile: ProfileModel
  ) => {
    const csvConfig = {
      objectMode: true,
      delimiter: ';',
      quote: null,
      headers: true,
      renameHeaders: false,
      discardUnmappedColumns: true,
      encoding: 'utf-8'
    }

    const result = await new Promise<ActorRow[]>((resolve, reject) => {
      const readableStream = fs.createReadStream(filename)
      const data: ActorRow[] = []

      csv
        .parseStream(readableStream, csvConfig)
        .on('error', reject)
        .on('data', row =>
          data.push({
            ...row,
            profile: this.getProfileByName(row.profile, profiles, baseProfile)
              .id,
            publico: JSON.parse(row.publico)
          })
        )
        .on('end', () => resolve(data))
    })

    await removeFile(filename)

    return result
  }

  private fetchActorsByActorRows = async (actorRows: ActorRow[]) => {
    const emails = actorRows.map(actorRow => actorRow.email)
    return this.actorRepo.findAll({ email: emails })
  }

  private checkIfActorsAlreadyExist = async (actorRows: ActorRow[]) => {
    const actorsAlreadyExisted = await this.fetchActorsByActorRows(actorRows)

    if (actorsAlreadyExisted.length > 0) {
      const existentEmails = actorsAlreadyExisted.map(actor => actor.email)

      throw new ConflictError(
        `Os seguintes emails já existem: ${existentEmails}`
      )
    }
  }

  private createActor = async (actorRow: ActorRow) => {
    const promise = new Promise<ActorModel>((resolve, reject) => {
      this.actorRepo
        .create({
          email: actorRow.email,
          nome: actorRow.nome,
          senha: 'default123',
          profile: actorRow.profile,
          publico: actorRow.publico
        })
        .then(actor => resolve(actor))
        .catch(error => reject(error))
    })

    return promise
  }

  private createActors = async (actorRows: ActorRow[]) => {
    const promises = actorRows.reduce(
      (current, actorRow) => [...current, this.createActor(actorRow)],
      [] as Promise<ActorModel>[]
    )

    return Promise.all(promises)
  }

  execute = async (request: Request) => {
    const file = request.file

    const profiles = await this.fetchAllProfiles()
    const baseProfile = this.findBaseProfile(profiles)
    const actorRows = await this.parserActorsCSV(
      file.path,
      profiles,
      baseProfile
    )
    await this.checkIfActorsAlreadyExist(actorRows)

    return this.createActors(actorRows)
  }
}
