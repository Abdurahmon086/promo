'use server'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || ''

export const signUp = async (params: { email: string; password: string; username: string }) => {
	try {
		await connectToDatabase()

		const existingUser = await User.findOne({ email: params.email })
		if (existingUser) {
			throw new Error(`User already exists`)
		}

		const newUser = await User.create(params)
		const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' })

		const cookieStore = await cookies()
		cookieStore.delete('buyer_token')
		cookieStore.set('buyer_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 3600,
		})

		return { success: true, message: 'User signed up successfully', token }
	} catch (err) {
		throw new Error(`Failed to sign up: ${err as string}`)
	}
}

export const signIn = async (params: { email: string; password: string }) => {
	try {
		await connectToDatabase()

		const existingUser = await User.findOne({ email: params.email })
		if (existingUser.email != params.email || existingUser.password != params.password) {
			throw new Error(`Email or password wrong!`)
		}

		const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, JWT_SECRET, { expiresIn: '1h' })

		const cookieStore = await cookies()
		cookieStore.delete('buyer_token')
		cookieStore.set('buyer_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 3600,
		})

		return { success: true, message: 'User signed in successfully', token }
	} catch (err) {
		throw new Error(`Failed to sign up: ${err as string}`)
	}
}
