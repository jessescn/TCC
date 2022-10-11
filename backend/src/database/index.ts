/* istanbul ignore file */
import { Dialect, Sequelize } from 'sequelize'
import config from 'database/config'

const environment =
  (process.env.NODE_ENV as keyof typeof config) || 'development'

const createSequelizeInstance = () => {
  const { username, database, host, password, dialect, port } =
    config[environment]

  const uri = `postgresql://${username}:${password}@${host}:${port}/${database}`

  return new Sequelize(uri, {
    dialect: dialect as Dialect
  })
}

const sequelize = createSequelizeInstance()

const connect = async () => {
  try {
    await sequelize.sync({ logging: false })
    console.log('[DATABASE] Connection has been established successfully.')
  } catch (error) {
    console.error('[DATABASE] Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
