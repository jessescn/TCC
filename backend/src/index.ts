import express from 'express'
import cors from 'cors'
import parser from 'body-parser'
import * as database from './database'
import { routes } from './routes'

const app = express()

app.use(parser.json())
app.use(cors())
app.use(routes)

const port = process.env.PORT || 8080

app.listen(port, async () => {
  await database.connect()
  console.log(`[SERVER] Server listening on port ${port}`)
})
