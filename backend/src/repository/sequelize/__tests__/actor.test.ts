import Actor, { ActorAttributes, ActorModel } from 'domain/models/actor'
import { createMock, createMockList } from 'ts-auto-mock'
import {
  CreateActor,
  ActorRepository,
  InclusivableActorOptions
} from '../actor'

describe('Actor Repository', () => {
  const actors = createMockList<ActorModel>(2)
  const actor = createMock<ActorModel>()

  const sut = new ActorRepository()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Actor, 'findAll')
        .mockResolvedValueOnce(actors as ActorAttributes[])
    })

    it('should return all actors', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(actors)
      expect(Actor.findAll).toBeCalledWith({
        where: { deleted: false },
        ...InclusivableActorOptions
      })
    })

    it('should return only actors which query applies on', async () => {
      const query = { nome: 'test' }

      const result = await sut.findAll(query)

      expect(result).toEqual(actors)
      expect(Actor.findAll).toBeCalledWith({
        where: { deleted: false, ...query },
        ...InclusivableActorOptions
      })
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(Actor, 'findOne')
        .mockResolvedValueOnce(actor as ActorAttributes)
    })

    it('should return an existing actor by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(actor)
      expect(Actor.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        ...InclusivableActorOptions
      })
    })
  })

  describe('create', () => {
    const createActor = createMock<CreateActor>()

    beforeEach(() => {
      jest
        .spyOn(Actor, 'create')
        .mockResolvedValueOnce(actor as ActorAttributes)

      jest
        .spyOn(Actor, 'findOne')
        .mockResolvedValueOnce(actor as ActorAttributes)
    })

    it('should create a new actor', async () => {
      const result = await sut.create(createActor)

      expect(result).toEqual(actor)
      expect(Actor.create).toBeCalledWith(createActor)
    })
  })

  describe('update', () => {
    const actorWithSpies = {
      ...actor,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest.spyOn(Actor, 'findOne').mockResolvedValueOnce(actorWithSpies as any)
    })

    it('should update an existing actor', async () => {
      const data = { nome: 'test' }

      const result = await sut.update(1, data)

      expect(result).toEqual(actorWithSpies)
      expect(Actor.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        ...InclusivableActorOptions
      })
      expect(actorWithSpies.set).toBeCalledWith(data)
      expect(actorWithSpies.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const actorWithSpies = {
      ...actor,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest.spyOn(Actor, 'findOne').mockResolvedValueOnce(actorWithSpies as any)
    })

    it('should delete an existing actor setting the deleted flag as true (soft delete)', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(actorWithSpies)
      expect(Actor.findOne).toBeCalledWith({
        where: { id: 1, deleted: false },
        ...InclusivableActorOptions
      })
      expect(actorWithSpies.set).toBeCalledWith({ deleted: true })
      expect(actorWithSpies.save).toBeCalled()
    })
  })
})
