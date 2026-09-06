import mongoose from 'mongoose'
import env from './env.js'

export async function connectDatabase() {
  if (!env.mongodbUri) {
    console.warn('MONGODB_URI is not configured; running the API without a database connection.')
    return false
  }

  await mongoose.connect(env.mongodbUri)
  console.log('MongoDB connected')
  return true
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}
