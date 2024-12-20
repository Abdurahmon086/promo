import { ReactNode } from 'react'

export interface ChildProps {
	children: ReactNode
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
