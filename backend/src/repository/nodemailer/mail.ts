import { createTransport, SendMailOptions } from 'nodemailer'
import { EmailTemplate } from 'templates'

type Auth = {
  user: string
  pass: string
}

export class MailSender {
  static auth: Auth = {
    user: process.env.MAIL_TRANSPORTER_USER,
    pass: process.env.MAIL_TRANSPORTER_PASSWORD
  }

  static transporter = createTransport({
    service: 'gmail',
    auth: this.auth
  })

  static async send(data: EmailTemplate) {
    const mailOptions: SendMailOptions = { ...data, from: this.auth.user }

    const info = await this.transporter.sendMail(mailOptions)
    return info
  }
}
