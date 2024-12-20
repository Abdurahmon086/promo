'use server'

import Promo from '@/database/promo.model'
import { connectToDatabase } from '@/lib/mongoose'

export const getPromos = async () => {
	try {
		await connectToDatabase()
		const promos = await Promo.find()
		return promos
	} catch (error: unknown) {
		throw new Error(`Failed to fetch promos ${error}`)
	}
}

export const createPromo = async () => {
	try {
		await connectToDatabase()
		const data = {
			title_uz: 'asd',
			title_ru: 'asd',
			description_uz: 'String',
			discription_ru: 'String',
			price: 1212,
			active: true,
			code: 'asd5asd4',
		}

		await Promo.create(data)
	} catch (error: unknown) {
		throw new Error(`Failed to create promo ${error}`)
	}
}
