import { model, models, Schema } from 'mongoose'

const CompanySchema = new Schema(
	{
		title: String,
		description: String,
		image: String,
		active: Boolean,
		website: String,
	},
	{ timestamps: true }
)

const Company = models.Company || model('Company', CompanySchema)
export default Company
