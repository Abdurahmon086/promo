import mongoose, { ConnectOptions } from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
		return console.log('MISSING MONGODB_URL')
	}

	if (isConnected) {
		return
	}

	try {
		const options: ConnectOptions = {
			dbName: 'promocodes',
			autoCreate: true,
		}

		await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, options)
		isConnected = true
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.log('MongoDB connection failed')
	}
}
