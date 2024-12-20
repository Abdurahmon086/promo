'use server'

import Company from '@/database/company.model'
import { connectToDatabase } from '@/lib/mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const creatCompanyAction = async (data: any) => {
	try {
		console.log(data)
		await connectToDatabase()
		await Company.create({ ...data })
	} catch (err) {
		throw new Error(`Failed to create promo ${err as string}`)
	}
}
