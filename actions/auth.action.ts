'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || ''

const createToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

const setAuthCookie = async (token: string) => {
	const cookieStore = await cookies()
	cookieStore.delete('buyer_token')
	cookieStore.set('buyer_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: 3600,
	})
}

export const signUp = async (params: { email: string; password: string; username: string }) => {
	try {
		await connectToDatabase()

		const existingUser = await User.findOne({ email: params.email })
		if (existingUser) {
			return { success: false, message: 'User already exists' }
		}

		const newUser = await User.create(params)
		const token = createToken({ id: newUser._id, email: newUser.email })

		await setAuthCookie(token)
		return { success: true, message: 'User signed up successfully', token }
	} catch (err) {
		throw new Error(`Failed to sign up: ${err instanceof Error ? err.message : String(err)}`)
	}
}

export const signIn = async (params: { email: string; password: string }) => {
	try {
		await connectToDatabase()

		const existingUser = await User.findOne({ email: params.email })
		if (!existingUser || existingUser.password !== params.password) {
			return { success: false, message: 'Invalid email or password' }
		}

		const token = createToken({ id: existingUser._id, email: existingUser.email })

		await setAuthCookie(token)
		return { success: true, message: 'User signed in successfully', token }
	} catch (err) {
		throw new Error(`Failed to sign in: ${err instanceof Error ? err.message : String(err)}`)
	}
}

export const loginCheck = async (token: string) => {
	try {
		await connectToDatabase()
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
		const user = await User.findOne({ _id: decoded.id })
		if (!user) {
			return false
		}
		return true
	} catch (err) {
		throw new Error(`Failed to sign in: ${err instanceof Error ? err.message : String(err)}`)
	}
}
