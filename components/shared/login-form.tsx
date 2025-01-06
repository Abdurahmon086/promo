'use client' // Bu komponentni Client Component sifatida belgilaydi

import { signIn, signUp } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function LoginForm({ type }: { type: 'sign-in' | 'sign-up' }) {
	interface AuthResponse {
		success: boolean
		message: string
		token?: string
	}
	const [user, setUser] = useState<AuthResponse | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		setIsLoading(true)
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const data = {
			email: String(formData.get('email') || ''),
			password: String(formData.get('password') || ''),
		}
		let promise
		if (type == 'sign-up') {
			promise = signUp({ ...data, username: String(formData.get('username') || '') })
				.then(res => setUser(res))
				.finally(() => setIsLoading(false))
		} else {
			promise = signIn(data)
				.then(res => setUser(res))
				.finally(() => setIsLoading(false))
		}

		toast.promise(promise, {
			loading: 'Creating promo...',
			success: user?.message,
			error: 'Failed to email or password',
		})
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
