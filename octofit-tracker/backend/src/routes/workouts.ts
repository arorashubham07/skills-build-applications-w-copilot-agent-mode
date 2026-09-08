import { Router } from 'express'
import { WorkoutModel } from '../models/Workout.js'

export const workoutRouter = Router()

workoutRouter.get('/', async (request, response) => {
  const fitnessLevel = request.query.fitnessLevel
  const workouts =
    fitnessLevel === 'beginner' || fitnessLevel === 'intermediate' || fitnessLevel === 'advanced'
      ? await WorkoutModel.find({ fitnessLevel }).sort({ durationMinutes: 1 })
      : await WorkoutModel.find().sort({ durationMinutes: 1 })
  response.json(workouts)
})

workoutRouter.post('/', async (request, response) => {
  const workout = await WorkoutModel.create(request.body)
  response.status(201).json(workout)
})
