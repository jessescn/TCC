/* istanbul ignore file */
import { Sequelize } from 'sequelize'

const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DB

const sequelize = new Sequelize(
  `postgresql://${username}:${password}@localhost:5432/${database}`
)

const connect = async () => {
  try {
    await sequelize.sync({ logging: false })
    console.log('[DATABASE] Connection has been established successfully.')
  } catch (error) {
    console.error('[DATABASE] Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
