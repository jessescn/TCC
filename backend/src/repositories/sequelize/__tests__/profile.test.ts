import Profile, { ProfileAttributes, ProfileModel } from 'domain/models/profile'
import { createMock, createMockList } from 'ts-auto-mock'
import { CreateProfile, ProfileRepository } from '../profile'
import { createUpdatableElement } from './voto.test'

describe('Profile Repository', () => {
  const profile = createMock<ProfileModel>()
  const profiles = createMockList<ProfileModel>(2)

  const sut = new ProfileRepository()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(Profile, 'findOne')
        .mockResolvedValueOnce(profile as ProfileAttributes)
    })

    it('should return a specific profile by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(profile)
      expect(Profile.findOne).toBeCalledWith({
        where: { id: 1, deleted: false }
      })
    })
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Profile, 'findAll')
        .mockResolvedValueOnce(profiles as ProfileAttributes[])
    })

    it('should return all profiles', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(profiles)
      expect(Profile.findAll).toBeCalledWith({
        where: { deleted: false }
      })
    })

    it('should return all profiles which query applies on', async () => {
      const query = { nome: 'teste' }

      const result = await sut.findAll(query)

      expect(result).toEqual(profiles)
      expect(Profile.findAll).toBeCalledWith({
        where: { deleted: false, ...query }
      })
    })
  })

  describe('create', () => {
    const data = createMock<CreateProfile>()

    beforeEach(() => {
      jest
        .spyOn(Profile, 'create')
        .mockResolvedValueOnce(profile as ProfileAttributes)
    })

    it('should create a new profile', async () => {
      const result = await sut.create(data)

      expect(result).toEqual(profile)
      expect(Profile.create).toBeCalledWith({
        nome: data.nome,
        permissoes: data.permissoes
      })
    })
  })

  describe('update', () => {
    const profileWithSpies = createUpdatableElement<ProfileAttributes>(profile)

    beforeEach(() => {
      jest
        .spyOn(Profile, 'findOne')
        .mockResolvedValueOnce(profileWithSpies as any)
    })

    it('should update an existing profile', async () => {
      const data: Partial<ProfileModel> = { nome: 'teste' }

      const result = await sut.update(1, data)

      expect(result).toEqual(profileWithSpies)
      expect(Profile.findOne).toBeCalled()
      expect(profileWithSpies.save).toBeCalled()
      expect(profileWithSpies.set).toBeCalledWith(data)
    })
  })

  describe('destroy', () => {
    const profileWithSpies = createUpdatableElement<ProfileAttributes>(profile)

    beforeEach(() => {
      jest
        .spyOn(Profile, 'findOne')
        .mockResolvedValueOnce(profileWithSpies as any)
    })

    it('should delete an existing profile setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(profileWithSpies)
      expect(Profile.findOne).toBeCalled()
      expect(profileWithSpies.save).toBeCalled()
      expect(profileWithSpies.set).toBeCalledWith({ deleted: true })
    })
  })
})
