import { Sequelize } from 'sequelize'

const username = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD
const database = process.env.POSTGRES_DB

const sequelize = new Sequelize(
  `postgresql://${username}:${password}@localhost:5432/${database}`
)

const connect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connect
