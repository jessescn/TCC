import 'jest-ts-auto-mock'

process.env.SECRETARIA_EMAIL = 'secretaria_teste@mail.com'
process.env.MAIL_TRANSPORTER_USER = 'user@mail.com'
process.env.MAIL_TRANSPORTER_PASSWORD = 'password'
process.env.JWT_SECRET_KEY = 'secret_key'
process.env.JWT_TOKEN_EXPIRATION = '24h'
process.env.DATABASE_URL = 'postgresql://postgres:admin@localhost:5432/postgres'

jest.spyOn(global.console, 'error').mockImplementation()
jest.spyOn(global.console, 'warn').mockImplementation()

jest.mock('repositories/nodemailer/mail', () => {
  const originalModule = jest.requireActual('repositories/nodemailer/mail')
  return {
    ...originalModule,
    MailSender: { send: jest.fn() }
  }
})
