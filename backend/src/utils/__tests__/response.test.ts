import { BadRequestError } from 'types/express/errors'
import { createMock } from 'ts-auto-mock'

import { HttpStatusCode, Response } from 'types/express'
import { errorResponseHandler } from '../response'

describe('Response utils Tests', () => {
  describe('errorResponseHandler', () => {
    const sut = errorResponseHandler

    it('should call response with status with respective status/message error', () => {
      const message = 'error message'
      const error = new BadRequestError(message)

      const sendMock = jest.fn()
      const statusMock = jest.fn().mockReturnValue({ send: sendMock } as any)
      const response = createMock<Response>({ status: statusMock })

      sut(response, error)

      expect(statusMock).toBeCalledWith(error.status)
      expect(sendMock).toBeCalledWith(error.message)
    })

    it('should call response with default server error if error isnt on type RequestError', () => {
      const error = new ReferenceError()

      const sendMock = jest.fn()
      const statusMock = jest.fn().mockReturnValue({ send: sendMock } as any)
      const response = createMock<Response>({ status: statusMock })

      sut(response, error)

      expect(statusMock).toBeCalledWith(HttpStatusCode.serverError)
      expect(sendMock).toBeCalled()
    })
  })
})
