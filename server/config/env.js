import 'dotenv/config'

const port = Number.parseInt(process.env.PORT || '5000', 10)

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.isFinite(port) ? port : 5000,
  mongodbUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  authSecret: process.env.AUTH_SECRET || '',
}

export default env
