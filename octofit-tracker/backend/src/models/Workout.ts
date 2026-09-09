import { InferSchemaType, model, Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    durationMinutes: { type: Number, required: true, min: 1, max: 180 },
  },
  { timestamps: true },
)

export type Workout = InferSchemaType<typeof workoutSchema>
export const WorkoutModel = model('Workout', workoutSchema)
