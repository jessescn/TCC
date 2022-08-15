/* istanbul ignore file */
import { Dialect, Sequelize } from 'sequelize'

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const dialect = process.env.DB_DIALECT as Dialect

const uri = `postgresql://${username}:${password}@${host}:${port}/${database}`

const sequelize = new Sequelize(uri, {
  dialect
})

const connect = async () => {
  try {
    await sequelize.sync({ logging: false })
    console.log('[DATABASE] Connection has been established successfully.')
  } catch (error) {
    console.error('[DATABASE] Unable to connect to the database:', error)
  }
}

export { connect, sequelize }
