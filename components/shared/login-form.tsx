'use client' // Bu komponentni Client Component sifatida belgilaydi

import { signIn, signUp } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function LoginForm({ type }: { type: 'sign-in' | 'sign-up' }) {
	interface AuthResponse {
		success: boolean
		message: string
		token?: string
	}
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.currentTarget)
		const data = {
			email: String(formData.get('email') || ''),
			password: String(formData.get('password') || ''),
		}

		const authAction = type === 'sign-up' ? signUp({ ...data, username: String(formData.get('username') || '') }) : signIn(data)

		try {
			const res = await authAction

			await toast.promise(authAction, {
				loading: 'Processing...',
				success: (data: AuthResponse) => data.message,
				error: 'Failed to authenticate. Check email or password.',
			})

			if (res?.success) {
				router.push('/dashboard')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className={cn('flex flex-col gap-6')} onSubmit={handleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Login to your account</h1>
				<p className='text-balance text-sm text-muted-foreground'>Enter your email below to login to your account</p>
			</div>
			<div className='grid gap-6'>
				{type === 'sign-up' && (
					<div className='grid gap-2'>
						<Label htmlFor='username'>Username</Label>
						<Input type='text' name='username' id='username' placeholder='Your username' required disabled={isLoading} />
					</div>
				)}
				<div className='grid gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Input type='email' name='email' id='email' placeholder='m@example.com' required disabled={isLoading} />
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<Input name='password' id='password' type='password' required disabled={isLoading} />
				</div>
				<Button type='submit' className='w-full' disabled={isLoading}>
					{type !== 'sign-up' ? 'Sign in' : 'Sign up'}
				</Button>
			</div>
			<div className='text-center text-sm'>
				Don&apos;t have an account?
				<Link href={type === 'sign-up' ? 'sign-in' : 'sign-up'} className='underline underline-offset-4'>
					{type === 'sign-up' ? ' Sign in' : ' Sign up'}
				</Link>
			</div>
		</form>
	)
}
