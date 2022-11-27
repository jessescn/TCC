import bcrypt from 'bcrypt'

export const isValidPassword = async (password: string, encrypted: string) => {
  return bcrypt.compare(password, encrypted)
}

export const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}
