import { ActorModel } from 'domain/models/actor'
import { IActorRepository } from 'repositories/sequelize/actor'
import { UseCase } from 'usecases'

export class ActorsPublicosUseCase implements UseCase {
  constructor(private repo: IActorRepository) {}

  private fetchAllActors = async () => {
    const actors = await this.repo.findAll()

    return actors
  }

  private extractPublicosFromActors = (actors: ActorModel[]) => {
    const publicos = actors.reduce((publicos, actor) => {
      return [...publicos, ...actor.publico]
    }, [] as string[])

    return [...new Set(publicos)]
  }

  execute = async () => {
    const actors = await this.fetchAllActors()
    const publicos = this.extractPublicosFromActors(actors)

    return publicos
  }
}
