import { ProfileRepository } from 'repository/sequelize/profile'

export const makeProfileRepository = () => {
  return new ProfileRepository()
}
