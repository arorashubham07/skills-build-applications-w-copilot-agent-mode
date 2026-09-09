import { Router } from 'express'
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js'

export const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntryModel.find()
    .sort({ points: -1 })
    .populate('userId', 'displayName')
  response.json(leaderboard)
})
