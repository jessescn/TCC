import { isNumber } from 'utils/value'
describe('Value utils Tests', () => {
  describe('isNumber', () => {
    const sut = isNumber

    it('should return "true" if value is a number', () => {
      const value = 1
      const result = sut(value)

      expect(result).toBeTruthy()
    })

    it('should return "false" if value isnt a number', () => {
      const value1 = '1e'
      const value2 = NaN
      const value3 = {}

      const result1 = sut(value1)
      const result2 = sut(value2)
      const result3 = sut(value3)

      expect(result1).toBeFalsy()
      expect(result2).toBeFalsy()
      expect(result3).toBeFalsy()
    })
  })
})
