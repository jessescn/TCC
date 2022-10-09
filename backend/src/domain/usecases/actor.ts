import { ActorModel } from 'domain/models/actor'
import { Profiles } from 'domain/profiles'

export class ActorUseCase {
  static filterByRole(actors: ActorModel[], profile: Profiles) {
    return actors.filter(actor => actor.profile.nome === profile)
  }

  static getPublicos(actors: ActorModel[]) {
    const publicos = actors.reduce((publicos, actor) => {
      return [...new Set([...publicos, ...actor.publico])]
    }, [] as string[])

    return publicos
  }
}
