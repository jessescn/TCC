import express from 'express'
import cors from 'cors'
import parser from 'body-parser'
import * as database from './database'
import routes from './routes'
import { populateInitialData } from 'database/setup'

const app = express()

app.use(parser.json())
app.use(cors())
app.use(routes.actorRoutes)
app.use(routes.authRoutes)
app.use(routes.colegiadoRoutes)
app.use(routes.comentarioRoutes)
app.use(routes.formularioRoutes)
app.use(routes.procedimentoRoutes)
app.use(routes.profileRoutes)
app.use(routes.tipoProcedimentoRoutes)
app.use(routes.userRoutes)

const port = process.env.PORT || 8080

app.listen(port, async () => {
  await database.connect()
  await populateInitialData()
  console.log(`[SERVER] Server listening on port ${port}`)
})
