import PDFKitGenerator from 'pdfkit'
import fs from 'fs'

export class PDFGenerator {
  static async generateBasicPDF(content: string, filename: string) {
    const output = new PDFKitGenerator()

    output.pipe(fs.createWriteStream(`uploads/${filename}`))

    output.text(content)

    output.end()
  }
}
