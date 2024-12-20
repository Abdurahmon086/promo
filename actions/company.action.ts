'use server'

import Company from '@/database/company.model'
import { connectToDatabase } from '@/lib/mongoose'
import { ICompany } from '@/types'

export const getCompaniesAction = async () => {
	try {
		await connectToDatabase()
		const companies: ICompany[] = await Company.find()
		return companies
	} catch (err) {
		throw new Error(`Failed to get companies ${err as string}`)
	}
}

export const creatCompanyAction = async (data: ICompany) => {
	try {
		await connectToDatabase()
		await Company.create({ ...data })
	} catch (err) {
		throw new Error(`Failed to create promo ${err as string}`)
	}
}
