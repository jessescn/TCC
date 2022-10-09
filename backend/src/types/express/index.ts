/* eslint-disable no-unused-vars */
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { ActorModel } from 'domain/models/actor'

export interface Request extends ExpressRequest {
  actor?: ActorModel
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
