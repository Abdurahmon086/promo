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

export const createPromo = async (data: unknown) => {
	try {
		await connectToDatabase()
		await Promo.create(data)
	} catch (error: unknown) {
		throw new Error(`Failed to create promo ${error}`)
	}
}
