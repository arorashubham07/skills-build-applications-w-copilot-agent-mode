import { Router } from 'express'
import { TeamModel } from '../models/Team.js'

export const teamRouter = Router()

teamRouter.get('/', async (_request, response) => {
  const teams = await TeamModel.find().sort({ name: 1 }).populate('memberIds', 'displayName')
  response.json(teams)
})

teamRouter.post('/', async (request, response) => {
  const team = await TeamModel.create(request.body)
  response.status(201).json(team)
})
