import { Request, Response } from 'types/express'

export interface CrudController {
  create: (req: Request, res: Response) => Promise<void>
  read: (req: Request, res: Response) => Promise<void>
  update: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<void>
}
