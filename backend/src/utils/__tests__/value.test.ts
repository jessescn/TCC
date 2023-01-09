import { Pagination } from 'repositories'
import { isNumber, paginateList } from 'utils/value'
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

  describe('paginateList', () => {
    const sut = paginateList
    const list = [1, 2, 3, 4, 5, 6, 7]

    it('should return part of list based on pagination window', () => {
      const pagination: Pagination = { page: 1, per_page: 3, term: null }

      const result = sut(list, pagination)

      expect(result).toEqual([1, 2, 3])
    })

    it('should return less itens than pagination size if doesn`t have enough itens', () => {
      const pagination: Pagination = { page: 3, per_page: 3, term: null }

      const result = sut(list, pagination)

      expect(result).toEqual([7])
    })
  })
})
