import { PDFGenerator } from '../pdf'
import fs from 'fs'

describe('PDF Generator', () => {
  const sut = PDFGenerator

  describe('generateBasicPDF', () => {
    it('should create a new pdf with specific filename and content', async () => {
      const content = 'teste'
      const filename = `teste-${new Date().getTime()}.pdf`

      await sut.generateBasicPDF(content, filename)

      expect(fs.existsSync(`uploads/${filename}`))
    })
  })
})
