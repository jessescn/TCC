import { ProfileRepository } from 'repositories/sequelize/profile'

export const makeProfileRepository = () => {
  return new ProfileRepository()
}
