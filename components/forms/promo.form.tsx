'use client'

import { createPromo } from '@/actions/promo.action'
import { promoAddSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

function PromoForm() {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof promoAddSchema>>({
		resolver: zodResolver(promoAddSchema),
		defaultValues: {
			title_uz: '',
			title_ru: '',
			description_uz: '',
			description_ru: '',
			active: false,
			code: '',
			price: 0,
			company_id: undefined,
			user_id: undefined,
		},
	})

	function onSubmit(values: z.infer<typeof promoAddSchema>) {
		setIsLoading(true)
		console.log('first')
		const promise = createPromo({ ...values })
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Creating promo...',
			success: 'Promo created successfully',
			error: 'Failed to create promo',
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title_uz'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input disabled={isLoading} className='h-32 resize-none' placeholder={'title'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title_ru'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input disabled={isLoading} className='h-32 resize-none' placeholder={'title'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='code'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input disabled={isLoading} className='h-32 resize-none' placeholder={'Code'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input disabled={isLoading} className='h-32 resize-none' placeholder={'Code'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='active'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Active</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='company_id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a verified email to display' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='m@example.com'>m@example.com</SelectItem>
									<SelectItem value='m@google.com'>m@google.com</SelectItem>
									<SelectItem value='m@support.com'>m@support.com</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								You can manage email addresses in your <Link href='/examples/forms'>email settings</Link>.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='user_id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a verified email to display' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='m@example.com'>m@example.com</SelectItem>
									<SelectItem value='m@google.com'>m@google.com</SelectItem>
									<SelectItem value='m@support.com'>m@support.com</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>
								You can manage email addresses in your <Link href='/examples/forms'>email settings</Link>.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description_uz'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Short description<span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Textarea {...field} className='h-44 bg-secondary' placeholder='Description' disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description_ru'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Short description<span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Textarea {...field} className='h-44 bg-secondary' placeholder='Description' disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-fit rounded-full' size={'lg'} type='submit' disabled={isLoading}>
					<span>send</span>
					<Send className='ml-2 size-4' />
				</Button>
			</form>
		</Form>
	)
}

export default PromoForm
