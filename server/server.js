import app from './app.js'
import env from './config/env.js'
import { connectDatabase } from './config/db.js'

async function startServer() {
  try {
    await connectDatabase()

    app.listen(env.port, () => {
      console.log(`SeatLY API listening on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start SeatLY API:', error.message)
    process.exit(1)
  }
}

startServer()
