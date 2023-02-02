import bcrypt from 'bcrypt'

export const validatePassword = async (password: string, encrypted: string) => {
  return bcrypt.compare(password, encrypted)
}

export const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}
