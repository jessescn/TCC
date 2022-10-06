import { createMock } from 'ts-auto-mock'
import { Request } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

describe('Request utils Tests', () => {
  describe('hasNumericId', () => {
    const sut = hasNumericId

    it('should throw BadRequestError if does not contains numeric id', () => {
      const request = createMock<Request>({ params: {} })

      const shouldThrow = () => {
        sut(request)
      }

      expect(shouldThrow).toThrow(BadRequestError)
    })

    it("should throw BadRequestError if id isn't a numeric (number/string)", () => {
      const request = createMock<Request>({ params: { id: 'aaa' } })

      const shouldThrow = () => {
        sut(request)
      }

      expect(shouldThrow).toThrow(BadRequestError)
    })

    it("shouldn't throw error if id is a valid number (stringfied number)", () => {
      const request = createMock<Request>({ params: { id: '1' } })

      const shouldNotThrow = () => {
        sut(request)
      }

      expect(shouldNotThrow).not.toThrow(BadRequestError)
    })
  })

  describe('notIncludesInvalidFields', () => {
    const sut = notIncludesInvalidFields

    it('should throw BadRequestError if includes invalid fields', () => {
      const body = { a: 1, b: 2 }
      const request = createMock<Request>({ body })

      const shouldThrow = () => {
        sut(request, ['a', 'c'])
      }

      expect(shouldThrow).toThrow(BadRequestError)
    })

    it("shouldn't throw BadRequestError if body does not contains invalid fields", () => {
      const body = { a: 1, b: 2 }
      const request = createMock<Request>({ body })

      const shouldNotThrow = () => {
        sut(request, ['a', 'b'])
      }

      expect(shouldNotThrow).not.toThrow(BadRequestError)
    })
  })
})
