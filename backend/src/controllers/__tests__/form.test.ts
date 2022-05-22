import {
  makeRequest,
  makeResponse,
  makeStatusSpy
} from '../../jest/__mocks__/controllers'
import {
  mockServiceCreate,
  mockServiceDestroy,
  mockServiceGetAll,
  mockServiceGetById,
  mockServiceUpdate
} from '../../jest/__mocks__/services'
import { FormMockBuilder } from 'models/__mocks__/form-mock'
import { FormService, RemoteForm } from 'services/form-service'
import { HttpStatusCode } from 'types/express'
import { FormController } from '../form'

describe('Controller de formulário', () => {
  const formMock = new FormMockBuilder().generate()
  const forms = new FormMockBuilder().generate(2)
  const newForm: RemoteForm = {
    name: 'form 1',
    fields: [
      {
        name: 'input',
        order: 1,
        placeholder: 'input one',
        required: false,
        type: 'string'
      }
    ]
  }

  const baseRequest = makeRequest()
  const sut = FormController

  test('create: deve criar e retornar um novo usuário', async () => {
    const jsonSpy = jest.fn()
    const statusSpy = makeStatusSpy({ json: jsonSpy })

    const request = makeRequest({ body: newForm })
    const response = makeResponse({ status: statusSpy })

    mockServiceCreate(FormService, formMock)

    await sut.create(request, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.created)
    expect(jsonSpy).toBeCalledWith(formMock)
  })

  test('create: deve lançar um BadRequestError caso algum dado não seja fornecido', async () => {
    const statusSpy = makeStatusSpy()

    const requestWithoutFields = makeRequest({ body: { name: 'form' } }) // fields not provided
    const requestWithoutName = makeRequest({ body: { fields: [] } }) // fields not provided

    const response = makeResponse({ status: statusSpy })

    await sut.create(requestWithoutFields, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.badRequest)

    await sut.create(requestWithoutName, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.badRequest)
  })

  test('read: deve retornar todos os formulários', async () => {
    const getAllSpy = mockServiceGetAll(FormService, forms)

    const sendSpy = jest.fn()
    const response = makeResponse({ send: sendSpy })

    await sut.read(baseRequest, response)

    expect(getAllSpy).toBeCalled()
    expect(sendSpy).toBeCalledWith(forms)
  })

  test('read: deve mandar status ServerError caso alguma exceção seja lançada', async () => {
    mockServiceGetAll(FormService, Promise.reject(new Error()))

    const statusSpy = makeStatusSpy()
    const response = makeResponse({ status: statusSpy })

    await sut.read(baseRequest, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.serverError)
  })

  test('readById: deve retornar um form pelo seu id', async () => {
    const getByIdSpy = mockServiceGetById(FormService, formMock)

    const jsonSpy = jest.fn()
    const request = makeRequest({ params: { id: '1' } })
    const response = makeResponse({ json: jsonSpy })

    await sut.readById(request, response)

    expect(getByIdSpy).toBeCalledWith(1)
    expect(jsonSpy).toBeCalledWith(formMock)
  })

  test('readById: deve retornar BadRequestError caso o id não seja numero', async () => {
    const statusSpy = makeStatusSpy()

    const request = makeRequest({ params: { id: 'form1' } })
    const response = makeResponse({ status: statusSpy })

    await sut.readById(request, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.badRequest)
  })

  test('update: deve atualizar as informações de um formulário', async () => {
    const updateSpy = mockServiceUpdate(FormService, formMock)

    const data = { name: 'form new name' }
    const request = makeRequest({ params: { id: '1' }, body: data })

    const jsonSpy = jest.fn()
    const response = makeResponse({ json: jsonSpy })

    await sut.update(request, response)

    expect(updateSpy).toBeCalledWith(1, data)
    expect(jsonSpy).toBeCalledWith(formMock)
  })

  test('update: deve lançar BadRequestError caso  não seja passado alteração ou o id não seja number', async () => {
    const data = { name: 'form new name' }
    const requestWithInvalidId = makeRequest({
      params: { id: '1dwdw' },
      body: data
    })
    const requestWithNoBody = makeRequest({
      params: { id: '1dwdw' },
      body: null
    })

    const statusSpy = makeStatusSpy()

    const response = makeResponse({ status: statusSpy })

    await sut.update(requestWithInvalidId, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.badRequest)

    await sut.update(requestWithNoBody, response)

    expect(statusSpy).toBeCalledWith(HttpStatusCode.badRequest)
  })

  test('delete: deve remover um formulário a partir do id', async () => {
    const destroySpy = mockServiceDestroy(FormService, formMock)

    const request = makeRequest({ params: { id: '1' } })

    const jsonSpy = jest.fn()
    const response = makeResponse({ json: jsonSpy })

    await sut.delete(request, response)

    expect(destroySpy).toBeCalledWith(1)
    expect(jsonSpy).toBeCalledWith(formMock)
  })

  test('delete: deve retornar BadRequestError caso o id não seja um número', async () => {
    const requestWithInvalidId = makeRequest({
      params: { id: '1dwdw' }
    })

    const statuSpy = makeStatusSpy()
    const response = makeResponse({ status: statuSpy })

    await sut.delete(requestWithInvalidId, response)

    expect(statuSpy).toBeCalledWith(HttpStatusCode.badRequest)
  })
})
