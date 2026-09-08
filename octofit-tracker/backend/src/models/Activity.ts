import { InferSchemaType, model, Schema, Types } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength-training'], required: true },
    durationMinutes: { type: Number, required: true, min: 1, max: 1440 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export type Activity = InferSchemaType<typeof activitySchema> & { userId: Types.ObjectId }
export const ActivityModel = model('Activity', activitySchema)
