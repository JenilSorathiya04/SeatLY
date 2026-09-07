import express from 'express'
import cors from 'cors'
import env from './config/env.js'
import healthRoutes from './routes/healthRoutes.js'
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js'

const app = express()

app.disable('x-powered-by')

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.use('/api/health', healthRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
