import { ReactNode } from 'react'

export interface ChildProps {
	children: ReactNode
}
export interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface LngParams {
	params: { lng: string }
}

export interface ICompany {
	_id?: string
	id?: string
	title: string
	description: string
	image: string
	active: boolean
	website: string
	createdAt?: number
	updatedAt?: number
}

export interface IPromo {
	_id?: string
	id?: string
	title_uz: string
	title_ru: string
	description_uz: string
	description_ru: string
	code: string
	price: string
	company_id: string
	active: boolean
	createdAt?: number
	updatedAt?: number
}
