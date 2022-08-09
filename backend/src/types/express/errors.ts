import { HttpStatusCode } from '.'

export abstract class RequestError extends Error {
  status: HttpStatusCode
}

export class BadRequestError extends RequestError {
  constructor(custom?: string) {
    super(custom ?? 'invalid request')
    this.name = 'Bad Request'
    this.status = HttpStatusCode.badRequest
  }
}

export class UnauthorizedError extends RequestError {
  constructor(custom?: string) {
    super(custom ?? 'no permission to access the resource')
    this.name = 'Unauthorized'
    this.status = HttpStatusCode.unauthorized
  }
}

export class NotFoundError extends RequestError {
  constructor(custom?: string) {
    super(custom ?? 'resource not found')
    this.name = 'Not Found'
    this.status = HttpStatusCode.notFound
  }
}

export class ConflictError extends RequestError {
  constructor(custom?: string) {
    super(custom ?? 'resource already exists')
    this.name = 'Conflict'
    this.status = HttpStatusCode.conflict
  }
}

export class ServerErrorError extends RequestError {
  constructor(custom?: string) {
    super(custom ?? 'internal error')
    this.name = 'Internal Server Error'
    this.status = HttpStatusCode.serverError
  }
}
