import { Router } from 'express'
import { ActivityModel } from '../models/Activity.js'
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js'

export const activityRouter = Router()

activityRouter.get('/', async (_request, response) => {
  const activities = await ActivityModel.find().sort({ completedAt: -1 }).populate('userId', 'displayName')
  response.json(activities)
})

activityRouter.post('/', async (request, response) => {
  const activity = await ActivityModel.create(request.body)

  await LeaderboardEntryModel.findOneAndUpdate(
    { userId: activity.userId },
    { $inc: { points: activity.points } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  )

  response.status(201).json(activity)
})
