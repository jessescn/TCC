import { EmailTemplate } from 'templates'

export interface IRepository {
  findOne: (primaryKey: any) => Promise<any>
  findAll: (query: any) => Promise<any[]>
  create: (data: any) => Promise<any>
  update: (primaryKey: any, data: any) => Promise<any>
  destroy: (primaryKey: any) => Promise<any>
}

export interface IMailRepository {
  send: (data: EmailTemplate) => Promise<any>
}

export interface IProcedimentoRepo extends IRepository {
  updateVote: (primaryKey: any, vote: any) => Promise<any>
  removeVote: (primaryKey: any, autor: any) => Promise<any>
  updateStatus: (primaryKey: any, status: any) => Promise<any>
  newRevisao: (primaryKey: any, revisao: any) => Promise<any>
}
