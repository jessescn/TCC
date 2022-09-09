import bcrypt from 'bcrypt'

export const isValidPassword = async (password: string, encrypted: string) => {
  return bcrypt.compare(password, encrypted)
}
