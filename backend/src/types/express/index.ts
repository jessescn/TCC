/* eslint-disable no-unused-vars */
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { UserModel } from 'models/user'

export interface Request extends ExpressRequest {
  permissoes?: Record<any, any>
  user?: UserModel
}

export interface Response extends ExpressResponse {}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  serverError = 500
}
