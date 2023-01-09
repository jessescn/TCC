import Voto, { VotoAttributes, VotoModel } from 'domain/models/voto'
import { createMock, createMockList } from 'ts-auto-mock'
import { CreateVoto, VotoQuery, VotoRepository } from '../voto'

export function createUpdatableElement<T>(base: any = {}) {
  return {
    ...base,
    set: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn()
  } as T
}

describe('Voto Repository', () => {
  const voto = createMock<VotoModel>()
  const votos = createMockList<VotoModel>(2)

  const sut = new VotoRepository()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(Voto, 'findAll')
        .mockResolvedValueOnce(votos as VotoAttributes[])
    })

    it('should return all votos', async () => {
      const result = await sut.findAll()

      expect(result).toEqual(votos)
      expect(Voto.findAll).toBeCalledWith({
        where: {}
      })
    })

    it('should return all votos which queries applies on', async () => {
      const query: VotoQuery = { aprovado: true }

      const result = await sut.findAll(query)

      expect(result).toEqual(votos)
      expect(Voto.findAll).toBeCalledWith({
        where: { ...query }
      })
    })
  })

  describe('findOne', () => {
    beforeEach(() => {
      jest.spyOn(Voto, 'findOne').mockResolvedValueOnce(voto as VotoAttributes)
    })

    it('should return a specific voto by id', async () => {
      const result = await sut.findOne(1)

      expect(result).toEqual(voto)
      expect(Voto.findOne).toBeCalledWith({ where: { id: 1 } })
    })
  })

  describe('create', () => {
    beforeEach(() => {
      jest.spyOn(Voto, 'create').mockResolvedValueOnce(voto as VotoAttributes)
    })

    it('should create a new voto', async () => {
      const data = createMock<CreateVoto>()

      const result = await sut.create(data)

      expect(result).toEqual(voto)
      expect(Voto.create).toBeCalledWith(data)
    })
  })

  describe('update', () => {
    const voto = createUpdatableElement<VotoAttributes>()
    beforeEach(() => {
      jest.spyOn(Voto, 'findOne').mockResolvedValueOnce(voto)
    })

    it('should update an existent vote', async () => {
      const data = createMock<Partial<VotoModel>>({ aprovado: false })

      const result = await sut.update(1, data)

      expect(result).toEqual(voto)
      expect(Voto.findOne).toBeCalledWith({ where: { id: 1 } })
      expect(voto.set).toBeCalledWith(data)
      expect(voto.save).toBeCalled()
    })
  })

  describe('destroy', () => {
    const voto = createUpdatableElement<VotoAttributes>()

    beforeEach(() => {
      jest.spyOn(Voto, 'findOne').mockResolvedValueOnce(voto)
    })

    it('should destroy an existing vote by id', async () => {
      const result = await sut.destroy(1)

      expect(result).toEqual(voto)
      expect(Voto.findOne).toBeCalledWith({ where: { id: 1 } })
      expect(voto.destroy).toBeCalled()
    })
  })

  describe('createOrUpdate', () => {
    const voto = createUpdatableElement<VotoAttributes>()

    it('should create a new vote if doesn`t exists any from specific autorId and procedimentoId', async () => {
      jest.spyOn(Voto, 'findAll').mockResolvedValueOnce([])
      jest.spyOn(Voto, 'create').mockResolvedValueOnce(voto)

      const data = createMock<CreateVoto>()

      const result = await sut.createOrUpdate(data)

      expect(result).toEqual(voto)
      expect(Voto.findAll).toBeCalledWith({
        where: { procedimentoId: data.procedimentoId, autorId: data.autorId }
      })
      expect(Voto.create).toBeCalledWith(data)
    })

    it('should update an existing vote if doesn`t exists', async () => {
      jest.spyOn(Voto, 'findAll').mockResolvedValueOnce([voto])

      const data = createMock<CreateVoto>()

      const result = await sut.createOrUpdate(data)

      expect(result).toEqual(voto)
      expect(voto.set).toBeCalledWith({ aprovado: data.aprovado })
      expect(voto.save).toBeCalled()
    })
  })
})
