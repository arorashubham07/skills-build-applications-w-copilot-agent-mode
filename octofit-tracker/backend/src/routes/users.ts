import { Router } from 'express'
import { UserModel } from '../models/User.js'

export const userRouter = Router()

userRouter.get('/', async (_request, response) => {
  const users = await UserModel.find().sort({ displayName: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const user = await UserModel.create(request.body)
  response.status(201).json(user)
})
