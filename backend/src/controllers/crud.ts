import { Request, Response } from '../types/express'

export interface CrudController {
  create: (req: Request, res: Response) => void
  read: (req: Request, res: Response) => void
  update: (req: Request, res: Response) => void
  delete: (req: Request, res: Response) => void
}
