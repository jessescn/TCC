/* istanbul ignore file */
import { Sequelize } from 'sequelize'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const createSequelizeInstance = () => {
  return new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
  })
}

const sequelize = createSequelizeInstance()

const connect = async () => {
  try {
    await sequelize.sync()
    console.log('[DATABASE] Connection has been established successfully.')
  } catch (error) {
    console.error('[DATABASE] Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
