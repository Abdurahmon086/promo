import { model, models, Schema } from 'mongoose'

const PromoSchema = new Schema(
	{
		title_uz: String,
		title_ru: String,
		description_uz: String,
		description_ru: String,
		price: Number,
		active: Boolean,
		code: String,
		company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
	},
	{ timestamps: true }
)

const Promo = models.Promo || model('Promo', PromoSchema)
export default Promo
