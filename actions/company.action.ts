'use server'

import Company from '@/database/company.model'
import { connectToDatabase } from '@/lib/mongoose'
import { ICompany } from '@/types'
import { revalidatePath } from 'next/cache'

export const getCompaniesAction = async () => {
	try {
		await connectToDatabase()
		const companies: ICompany[] = await Company.find({})
		return JSON.parse(JSON.stringify(companies))
	} catch (err) {
		throw new Error(`Failed to get companies ${err as string}`)
	}
}

export const getCompaniesByIdAction = async (id: string) => {
	try {
		await connectToDatabase()
		const company = await Company.findById(id)
		return JSON.parse(JSON.stringify(company))
	} catch (err) {
		throw new Error(`Failed to get companies by id ${err as string}`)
	}
}

export const creatCompanyAction = async (data: ICompany) => {
	try {
		await connectToDatabase()
		await Company.create({ ...data })
	} catch (err) {
		throw new Error(`Failed to create companies ${err as string}`)
	}
}

export const updateCompanyAction = async (id: string, data: ICompany, path: string) => {
	try {
		await connectToDatabase()
		await Company.findByIdAndUpdate(id, { ...data })
		revalidatePath(path)
	} catch (err) {
		throw new Error(`Failed to update companies ${err as string}`)
	}
}

export const deleteCompanyAction = async (id: string | undefined, path: string) => {
	try {
		await connectToDatabase()
		await Company.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (err) {
		throw new Error(`Failed to delete companies ${err as string}`)
	}
}
