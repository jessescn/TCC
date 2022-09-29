import { BadRequestError } from 'types/express/errors'
import {
  checkIncludesInvalidFields,
  validateMandatoryFields
} from 'utils/fields'

describe('Fields utils Tests', () => {
  describe('validateMandatoryFields', () => {
    const sut = validateMandatoryFields

    it("should throw BadRequestError if some field isn't in data", () => {
      const data = { value1: '', value2: '' }
      const fields = ['value1', 'value2', 'value3']
      const message = 'error message'

      try {
        sut(fields, data, message)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError)
        expect(error.message).toEqual(message)
      }
    })

    it("shouldn't throw error if data has all fields", () => {
      const data = { value1: '', value2: '' }
      const fields = ['value1']

      const shouldThrow = () => {
        sut(fields, data)
      }

      expect(shouldThrow).not.toThrow()
    })
  })

  describe('checkIncludesInvalidFields', () => {
    const sut = checkIncludesInvalidFields

    it('should return if data has invalid fields', () => {
      const invalidFields = ['field1', 'field2']

      const result1 = sut(invalidFields, { field1: '', field2: '' })
      const result2 = sut(invalidFields, { field2: true, field3: '' })

      expect(result1).toBeFalsy()
      expect(result2).toBeTruthy()
    })
  })
})
