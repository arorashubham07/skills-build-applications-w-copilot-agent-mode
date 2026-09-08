import { InferSchemaType, model, Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true, minlength: 2, maxlength: 50 },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export type Team = InferSchemaType<typeof teamSchema>
export const TeamModel = model('Team', teamSchema)
