import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    displayName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
)

export type User = InferSchemaType<typeof userSchema>
export const UserModel = model('User', userSchema)
