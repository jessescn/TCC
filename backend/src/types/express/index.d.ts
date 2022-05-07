import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import User from '../../models/user'

export interface Request extends ExpressRequest {
  permissions?: Record<any, any>
  user?: User
}

export interface Response extends ExpressResponse {}
