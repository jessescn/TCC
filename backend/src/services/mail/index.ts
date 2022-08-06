import { createTransport, Transporter, SendMailOptions } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type EmailTemplate = {
  to: string
  subject: string
  text: string
}

type Auth = {
  user: string
  pass: string
}

export class NodeMailer {
  private auth: Auth
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.auth = {
      user: process.env.MAIL_TRANSPORTER_USER,
      pass: process.env.MAIL_TRANSPORTER_PASSWORD
    }

    this.transporter = createTransport({ service: 'gmail', auth: this.auth })
  }

  async send(data: EmailTemplate) {
    const mailOptions: SendMailOptions = { ...data, from: this.auth.user }
    const info = await this.transporter.sendMail(mailOptions)
    return info
  }
}
