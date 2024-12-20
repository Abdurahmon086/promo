import { z } from 'zod'

export const promoAddSchema = z.object({
	title_uz: z.string().min(3),
	title_ru: z.string().min(3),
	description_uz: z.string(),
	description_ru: z.string(),
	price: z.string(),
	active: z.boolean(),
	code: z.string().min(4),
	company_id: z.string(),
})

export const companyAddSchema = z.object({
	title: z.string().min(3),
	description: z.string(),
	image: z.string(),
	active: z.boolean(),
	website: z.string(),
})
