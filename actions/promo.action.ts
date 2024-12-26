'use server'

import Company from '@/database/company.model'
import Promo from '@/database/promo.model'
import { connectToDatabase } from '@/lib/mongoose'
import { IPromo } from '@/types'
import { revalidatePath } from 'next/cache'

export const getPromos = async (params: { page: number; pageSize: number }) => {
	try {
		await connectToDatabase()
		const { page = 1, pageSize = 3 } = params
		const skipPage = (page - 1) * pageSize
		const promos = await Promo.find({}).skip(skipPage).limit(pageSize).sort({ createdAt: -1 }).populate({ path: 'company_id', model: Company })
		const totalPromos = await Promo.countDocuments()
		const isNext = totalPromos > skipPage + promos.length

		return { promos: JSON.parse(JSON.stringify(promos)), isNext, totalPromos }
	} catch (error) {
		throw new Error(`Failed to fetch promos ${error}`)
	}
}

export const getPromoById = async (id: string) => {
	try {
		await connectToDatabase()
		const promo = await Promo.findById(id).populate({
			path: 'company_id',
			select: '_id title image',
			model: Company,
		})
		return JSON.parse(JSON.stringify(promo))
	} catch (error) {
		throw new Error(`Failed to fetch promo by id ${error}`)
	}
}

export const createPromo = async (data: IPromo) => {
	try {
		await connectToDatabase()
		const datas = {
			...data,
			price: Number(data.price),
		}

		await Promo.create(datas)
	} catch (error) {
		throw new Error(`Failed to create promo ${error}`)
	}
}

export const updatePromo = async (id: string, data: IPromo, path: string) => {
	try {
		await connectToDatabase()
		await Promo.findByIdAndUpdate(id, data)
		revalidatePath(path)
	} catch (err) {
		throw new Error(`Failed to update promo ${err}`)
	}
}

export const deletePromo = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Promo.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (err) {
		throw new Error(`Failed to delete promo ${err}`)
	}
}

export const updateActivePromo = async (id: string, active: boolean, path: string) => {
	try {
		await connectToDatabase()
		await Promo.findByIdAndUpdate(id, { active })
		revalidatePath(path)
	} catch (err) {
		throw new Error(`Failed to update active promo ${err}`)
	}
}

export const searchPromo = async (value?: string) => {
	try {
		await connectToDatabase()
		const query = value ? { title_uz: { $regex: value, $options: 'i' } } : {}
		const promos = await Promo.find(query).populate({
			path: 'company_id',
			select: '_id title image',
			model: Company,
		})
		return JSON.parse(JSON.stringify(promos))
	} catch (err) {
		throw new Error(`Failed to search promo ${err}`)
	}
}
