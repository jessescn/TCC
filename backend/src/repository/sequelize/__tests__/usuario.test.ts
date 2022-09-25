import User, { UserAttributes, UserModel } from 'domain/models/user'
import { createMock, createMockList } from 'ts-auto-mock'
import { CreateUsuario, UsuarioRepository } from '../usuario'

describe('Usuario Repository', () => {
  const usuarios = createMockList<UserModel>(2)
  const usuario = createMock<UserModel>()

  const sut = new UsuarioRepository()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(User, 'findAll')
        .mockResolvedValueOnce(usuarios as UserAttributes[])
    })

    it('should return all users', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(usuarios)
      expect(User.findAll).toBeCalledWith({
        where: { deleted: false }
      })
    })

    it('should return only users which query applies on', async () => {
      const query = { nome: 'test' }

      const result = await sut.findAll(query)

      expect(result).toEqual(usuarios)
      expect(User.findAll).toBeCalledWith({
        where: { deleted: false, ...query }
      })
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(User, 'findOne')
        .mockResolvedValueOnce(usuario as UserAttributes)
    })

    it('should return an existing user by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(usuario)
      expect(User.findOne).toBeCalledWith({ where: { id: 1, deleted: false } })
    })
  })

  describe('create', () => {
    const createUsuario = createMock<CreateUsuario>()

    beforeEach(() => {
      jest
        .spyOn(User, 'create')
        .mockResolvedValueOnce(usuario as UserAttributes)
    })

    it('should create a new user', async () => {
      const result = await sut.create(createUsuario)

      expect(result).toEqual(usuario)
      expect(User.create).toBeCalledWith(createUsuario)
    })
  })

  describe('update', () => {
    const usuarioWithSpies = {
      ...usuario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(usuarioWithSpies as any)
    })

    it('should update an existing user', async () => {
      const data = { nome: 'test' }

      const result = await sut.update(1, data)

      expect(result).toEqual(usuarioWithSpies)
      expect(User.findOne).toBeCalledWith({ where: { id: 1, deleted: false } })
      expect(usuarioWithSpies.set).toBeCalledWith(data)
      expect(usuarioWithSpies.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const usuarioWithSpies = {
      ...usuario,
      set: jest.fn(),
      save: jest.fn()
    }

    beforeEach(() => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(usuarioWithSpies as any)
    })

    it('should delete an existing user setting the deleted flag as true', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(usuarioWithSpies)
      expect(User.findOne).toBeCalledWith({ where: { id: 1, deleted: false } })
      expect(usuarioWithSpies.set).toBeCalledWith({ deleted: true })
      expect(usuarioWithSpies.save).toBeCalled()
    })
  })
})
