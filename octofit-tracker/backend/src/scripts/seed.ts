import mongoose from 'mongoose'
import { connectToDatabase } from '../config/database.js'
import { ActivityModel } from '../models/Activity.js'
import { LeaderboardEntryModel } from '../models/LeaderboardEntry.js'
import { TeamModel } from '../models/Team.js'
import { UserModel } from '../models/User.js'
import { WorkoutModel } from '../models/Workout.js'

async function seedDatabase() {
  await connectToDatabase()

  const seedUsers = [
    { displayName: 'Avery Octo', email: 'avery.octo@mergington.edu', fitnessLevel: 'advanced' },
    { displayName: 'Blake Cat', email: 'blake.cat@mergington.edu', fitnessLevel: 'intermediate' },
    { displayName: 'Casey Dog', email: 'casey.dog@mergington.edu', fitnessLevel: 'beginner' },
    { displayName: 'Devon Fox', email: 'devon.fox@mergington.edu', fitnessLevel: 'intermediate' },
  ] as const
  const users = await Promise.all(
    seedUsers.map(async (user) =>
      await UserModel.findOneAndUpdate(
        { email: user.email },
        { $set: user },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ).orFail(),
    ),
  )

  const [avery, blake, casey, devon] = users

  await ActivityModel.deleteMany({ userId: { $in: users.map((user) => user._id) } })
  const activities = await ActivityModel.create([
    { userId: avery._id, type: 'running', durationMinutes: 45, points: 90, completedAt: new Date('2026-09-01T16:00:00Z') },
    { userId: avery._id, type: 'strength-training', durationMinutes: 30, points: 60, completedAt: new Date('2026-09-03T16:00:00Z') },
    { userId: blake._id, type: 'running', durationMinutes: 30, points: 60, completedAt: new Date('2026-09-02T16:00:00Z') },
    { userId: blake._id, type: 'walking', durationMinutes: 30, points: 30, completedAt: new Date('2026-09-04T16:00:00Z') },
    { userId: casey._id, type: 'walking', durationMinutes: 25, points: 25, completedAt: new Date('2026-09-03T16:00:00Z') },
    { userId: devon._id, type: 'strength-training', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-04T16:00:00Z') },
  ])

  const pointsByUser = new Map<string, number>()
  for (const activity of activities) {
    const userId = activity.userId.toString()
    pointsByUser.set(userId, (pointsByUser.get(userId) ?? 0) + activity.points)
  }

  await Promise.all(
    users.map((user) =>
      LeaderboardEntryModel.findOneAndUpdate(
        { userId: user._id },
        { $set: { points: pointsByUser.get(user._id.toString()) ?? 0 } },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
    ),
  )

  await Promise.all([
    TeamModel.findOneAndUpdate(
      { name: 'Octo Sprinters' },
      { $set: { memberIds: [avery._id, blake._id] } },
      { upsert: true, returnDocument: 'after', runValidators: true },
    ),
    TeamModel.findOneAndUpdate(
      { name: 'Fitness Pioneers' },
      { $set: { memberIds: [casey._id, devon._id] } },
      { upsert: true, returnDocument: 'after', runValidators: true },
    ),
  ])

  await WorkoutModel.bulkWrite(
    [
      {
        updateOne: {
          filter: { title: 'Start Moving' },
          update: {
            $set: {
              fitnessLevel: 'beginner',
              description: 'A low-impact 20-minute walking workout.',
              durationMinutes: 20,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { title: 'Build Strength' },
          update: {
            $set: {
              fitnessLevel: 'intermediate',
              description: 'A 30-minute bodyweight strength circuit.',
              durationMinutes: 30,
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { title: 'Power Session' },
          update: {
            $set: {
              fitnessLevel: 'advanced',
              description: 'A 40-minute interval workout for experienced athletes.',
              durationMinutes: 40,
            },
          },
          upsert: true,
        },
      },
    ],
  )

  console.log('Database seeding complete')
  await mongoose.disconnect()
}

seedDatabase().catch((error: unknown) => {
  console.error('Database seeding failed:', error)
  process.exitCode = 1
})
