import { loginCheck } from '@/actions/auth.action'

export const checkLog = async (token: string) => {
	try {
		return await loginCheck(token)
	} catch (err) {
		console.log(err)
	}
}
