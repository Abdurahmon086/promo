import { model, models, Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		role: String,
		active: Boolean,
	},
	{ timestamps: true }
)

const User = models.User || model('User', UserSchema)
export default User
