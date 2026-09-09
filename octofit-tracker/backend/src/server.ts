import express from 'express'
import mongoose from 'mongoose'
import { connectToDatabase } from './config/database.js'
import { activityRouter } from './routes/activities.js'
import { leaderboardRouter } from './routes/leaderboard.js'
import { teamRouter } from './routes/teams.js'
import { userRouter } from './routes/users.js'
import { workoutRouter } from './routes/workouts.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded',
    baseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use('/api/users', userRouter)
app.use('/api/activities', activityRouter)
app.use('/api/teams', teamRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ error: error.message })
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ error: 'Invalid resource identifier' })
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    return response.status(409).json({ error: 'A record with that unique value already exists' })
  }

  console.error(error)
  return response.status(500).json({ error: 'Internal server error' })
})

async function startServer() {
  await connectToDatabase()

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error)
  process.exitCode = 1
})
