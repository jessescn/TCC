import { ActorModel } from 'domain/models/actor'
import { Profiles } from 'domain/profiles'
import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'
import { ProfileModel } from 'domain/models/profile'
import { removeFile } from 'utils/file'

type ActorRow = {
  nome: string
  email: string
  profile: number
  publico: string[]
}

export class ActorHelper {
  static filterByRole(actors: ActorModel[], profile: Profiles) {
    return actors.filter(actor => actor.profile.nome === profile)
  }

  static getPublicos(actors: ActorModel[]) {
    const publicos = actors.reduce((publicos, actor) => {
      return [...new Set([...publicos, ...actor.publico])]
    }, [] as string[])

    return publicos
  }

  static getProfileId(
    profiles: ProfileModel[],
    profileName: string,
    baseProfile?: ProfileModel
  ) {
    const profile = profiles.find(profile => profile.nome === profileName)

    return profile?.id || baseProfile.id
  }

  static async parserCSV(
    filename: string,
    profiles: ProfileModel[],
    baseProfile?: ProfileModel
  ) {
    const result = await new Promise<ActorRow[]>((resolve, reject) => {
      const data: ActorRow[] = []
      const config = {
        objectMode: true,
        delimiter: ';',
        quote: null,
        headers: true,
        renameHeaders: false,
        discardUnmappedColumns: true,
        encoding: 'utf-8'
      }

      const readableStream = fs.createReadStream(
        path.resolve('/usr/app/', filename)
      )

      csv
        .parseStream(readableStream, config)
        .on('error', reject)
        .on('data', row =>
          data.push({
            ...row,
            profile: ActorHelper.getProfileId(
              profiles,
              row.profile,
              baseProfile
            ),
            publico: JSON.parse(row.publico)
          })
        )
        .on('end', () => resolve(data))
    })

    await removeFile(filename)

    return result
  }
}
