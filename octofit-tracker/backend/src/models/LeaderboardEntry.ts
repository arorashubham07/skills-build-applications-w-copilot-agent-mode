import { InferSchemaType, model, Schema } from 'mongoose'

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true },
)

export type LeaderboardEntry = InferSchemaType<typeof leaderboardEntrySchema>
export const LeaderboardEntryModel = model('LeaderboardEntry', leaderboardEntrySchema)
