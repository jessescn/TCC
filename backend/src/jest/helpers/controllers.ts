import { Request, Response } from 'types/express'
import jwt from 'jsonwebtoken'

export const makeRequest = (content: any = {}) => {
  return { ...content } as Request
}
export const makeResponse = (content: any) => {
  return { ...content } as Response
}
export const makeStatusSpy = (sendSpy: any = jest.fn()) => {
  return jest.fn().mockReturnValue({ send: sendSpy })
}

export const mockJwtSign = (value: any) => {
  jest.spyOn(jwt, 'sign').mockReturnValue(value)
}
