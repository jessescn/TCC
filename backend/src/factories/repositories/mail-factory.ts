import { MailRepository } from 'repository/nodemailer/mail'

export const makeMailRepository = () => {
  return new MailRepository()
}
