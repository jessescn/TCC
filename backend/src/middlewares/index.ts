import { NextFunction, Response } from 'express'
import { Request } from 'types/express'

export abstract class Middleware {
  abstract exec: (req: Request, res: Response, next: NextFunction) => void
}
