import express from 'express'
import cors from 'cors'
import parser from 'body-parser'
import * as database from './database'
import * as routes from './routes/index'
import { populateInitialData } from 'database/setup'

const app = express()

app.use(parser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('API is up and running')
})
app.use(routes.default.actorRoutes)
app.use(routes.default.authRoutes)
app.use(routes.default.colegiadoRoutes)
app.use(routes.default.comentarioRoutes)
app.use(routes.default.formularioRoutes)
app.use(routes.default.procedimentoRoutes)
app.use(routes.default.profileRoutes)
app.use(routes.default.tipoProcedimentoRoutes)
app.use(routes.default.userRoutes)

const port = process.env.PORT || 8080

app.listen(port, async () => {
  await database.connect()
  await populateInitialData()
  console.log(`[SERVER] Server listening on port ${port}`)
})
