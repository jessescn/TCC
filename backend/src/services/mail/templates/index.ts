import { EmailTemplate } from '..'

type Template = (to: string, data?: any) => EmailTemplate

const passwordRecovery: Template = (to: string, data: any) => ({
  to,
  subject: 'Recuperação de senha',
  text: `Aqui está sua nova senha: ${data.newPassword}`
})

export default {
  'password-recovery': passwordRecovery
}
