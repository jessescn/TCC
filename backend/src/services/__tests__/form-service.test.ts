import Form from 'models/form'
import { FormMockBuilder } from 'models/__mocks__/form-mock'
import { FormService, RemoteForm } from 'services/form-service'
import {
  mockCreate,
  mockFindAll,
  mockFindByPk
} from 'services/__mocks__/models-mock'
import { NotFoundError } from 'types/express/errors'

describe('Serviço de formulário', () => {
  const forms = new FormMockBuilder().generate(3)
  const sut = FormService

  test('getById: deve retornar o formulário pelo id', async () => {
    const findByPkSpy = mockFindByPk(Form, forms[0])

    const result = await sut.getById(forms[0].id)

    expect(result).toEqual(forms[0])
    expect(findByPkSpy).toHaveBeenCalledWith(forms[0].id)
  })

  test('getById: deve lançar um NotFoundError caso o formulário não seja encontrado', async () => {
    const findByPkSpy = mockFindByPk(Form, null)

    const getByIdThrowingError = async () => {
      await sut.getById(forms[0].id)
    }

    await expect(getByIdThrowingError).rejects.toThrow(NotFoundError)
    expect(findByPkSpy).toHaveBeenCalledWith(forms[0].id)
  })

  test('getAll: retorna todos os formulários', async () => {
    const findAllSpy = mockFindAll(Form, forms)

    const result = await sut.getAll()

    expect(result).toEqual(forms)
    expect(findAllSpy).toBeCalled()
  })

  test('create: deve criar um novo formulário', async () => {
    const newForm: RemoteForm = {
      fields: [],
      name: 'form 1'
    }
    const createSpy = mockCreate(Form, forms[0])

    const result = await sut.create(newForm)

    expect(result).toEqual(forms[0])
    expect(createSpy).toHaveBeenCalledWith(newForm)
  })

  test('update: deve atualizar um formulário existente com novos dados', async () => {
    const formWithSpies = { ...forms[0], set: jest.fn(), save: jest.fn() }
    const findByPkSpy = mockFindByPk(Form, formWithSpies)

    const updateValues = { name: 'form 2' }

    await sut.update(forms[0].id, updateValues)

    expect(findByPkSpy).toBeCalledWith(forms[0].id)
    expect(formWithSpies.set).toHaveBeenCalledWith(updateValues)
    expect(formWithSpies.save).toBeCalled()
  })

  test('update: deve lançar um NotFoundError caso o formulário não exista', async () => {
    const findByPkSpy = mockFindByPk(Form, null)

    const updateThrowingError = async () => {
      await sut.update(forms[0].id, { name: 'form' })
    }

    await expect(updateThrowingError).rejects.toThrow(NotFoundError)
    expect(findByPkSpy).toBeCalled()
  })

  test('destroy: deve remover um formulário pelo id', async () => {
    const formWIthSpies = {
      ...forms[0],
      destroy: jest.fn()
    }
    const findByPkSpy = mockFindByPk(Form, formWIthSpies)

    const result = await sut.destroy(forms[0].id)

    expect(formWIthSpies.destroy).toBeCalled()
    expect(findByPkSpy).toBeCalledWith(forms[0].id)
    expect(result.name).toEqual(forms[0].name)
  })

  test('destroy: deve lançar um NotFoundError caso o formulário não exista', async () => {
    const findByPkSpy = mockFindByPk(Form, null)

    const destroyThrowingError = async () => {
      await sut.destroy(forms[0].id)
    }

    await expect(destroyThrowingError).rejects.toThrow(NotFoundError)
    expect(findByPkSpy).toBeCalled()
  })
})
