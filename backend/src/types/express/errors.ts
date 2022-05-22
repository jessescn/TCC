import { HttpStatusCode } from '.'

export abstract class RequestError extends Error {
  status: HttpStatusCode
}

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(message)
    this.name = 'Bad Request'
    this.status = HttpStatusCode.badRequest
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(message)
    this.name = 'Unauthorized'
    this.status = HttpStatusCode.unauthorized
  }
}

export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message)
    this.name = 'Not Found'
    this.status = HttpStatusCode.notFound
  }
}

export class ConflictError extends RequestError {
  constructor(message: string) {
    super(message)
    this.name = 'Conflict'
    this.status = HttpStatusCode.conflict
  }
}

export class ServerErrorError extends RequestError {
  constructor(message: string) {
    super(message)
    this.name = 'Internal Server Error'
    this.status = HttpStatusCode.serverError
  }
}
