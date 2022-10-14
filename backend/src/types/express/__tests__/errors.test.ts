import { HttpStatusCode } from '..'
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ServerErrorError,
  UnauthorizedError
} from '../errors'

describe('Custom Errors', () => {
  it('should instantialize a new BadRequestError', () => {
    const result = new BadRequestError()
    const result2 = new BadRequestError('custom')

    expect(result.name).toEqual('Bad Request')
    expect(result.message).toEqual('invalid request')
    expect(result.status).toEqual(HttpStatusCode.badRequest)

    expect(result2.message).toEqual('custom')
  })

  it('should instantialize a new UnauthorizedError', () => {
    const result = new UnauthorizedError()
    const result2 = new UnauthorizedError('custom')

    expect(result.name).toEqual('Unauthorized')
    expect(result.message).toEqual('no permission to access the resource')
    expect(result.status).toEqual(HttpStatusCode.unauthorized)

    expect(result2.message).toEqual('custom')
  })

  it('should instantialize a new NotFoundError', () => {
    const result = new NotFoundError()
    const result2 = new NotFoundError('custom')

    expect(result.name).toEqual('Not Found')
    expect(result.message).toEqual('resource not found')
    expect(result.status).toEqual(HttpStatusCode.notFound)

    expect(result2.message).toEqual('custom')
  })

  it('should instantialize a new ConflictError', () => {
    const result = new ConflictError()
    const result2 = new ConflictError('custom')

    expect(result.name).toEqual('Conflict')
    expect(result.message).toEqual('resource already exists')
    expect(result.status).toEqual(HttpStatusCode.conflict)

    expect(result2.message).toEqual('custom')
  })

  it('should instantialize a new ServerErrorError', () => {
    const result = new ServerErrorError()
    const result2 = new ServerErrorError('custom')

    expect(result.name).toEqual('Internal Server Error')
    expect(result.message).toEqual('internal error')
    expect(result.status).toEqual(HttpStatusCode.serverError)

    expect(result2.message).toEqual('custom')
  })
})
