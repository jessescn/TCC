import { Response } from 'types/express'

export const responseMock = {
  json: jest.fn().mockResolvedValue((value: any) => value),
  send: jest.fn().mockResolvedValue((value: any) => value),
  status: jest.fn()
} as unknown as Response
