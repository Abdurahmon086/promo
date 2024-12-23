'use server'

import Promo from '@/database/promo.model'
import { connectToDatabase } from '@/lib/mongoose'
import { IPromo } from '@/types'
import { revalidatePath } from 'next/cache'

export const getPromos = async () => {
	try {
		await connectToDatabase()
		const promos = await Promo.find()
		return promos
	} catch (error: unknown) {
		throw new Error(`Failed to fetch promos ${error}`)
	}
}

export const getPromoById = async (id: string) => {
	try {
		await connectToDatabase()
		const promo = await Promo.findById(id)
		return JSON.parse(JSON.stringify(promo))
	} catch (error: unknown) {
		throw new Error(`Failed to fetch promo by id ${error}`)
	}
}

export const createPromo = async (data: IPromo) => {
	try {
		await connectToDatabase()
		await Promo.create(data)
	} catch (error: unknown) {
		throw new Error(`Failed to create promo ${error}`)
	}
}

export const updatePromo = async (id: string, data: IPromo, path: string) => {
	try {
		await connectToDatabase()
		await Promo.findByIdAndUpdate(id, data)
		revalidatePath(path)
	} catch (err: unknown) {
		throw new Error(`Failed to update promo ${err}`)
	}
}

export const deletePromo = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Promo.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (err: unknown) {
		throw new Error(`Failed to delete promo ${err}`)
	}
}
