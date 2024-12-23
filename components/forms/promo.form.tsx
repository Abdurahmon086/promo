'use client'

import { getCompaniesAction } from '@/actions/company.action'
import { createPromo } from '@/actions/promo.action'
import { promoAddSchema } from '@/lib/validation'
import { ICompany } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

function PromoForm() {
	const [isCompaneis, setIsCompanies] = useState<ICompany[]>([])
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
			price: '',
			company_id: '',
		},
	})

	function onSubmit(values: z.infer<typeof promoAddSchema>) {
		setIsLoading(true)
		const promise = createPromo({ ...values })
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Creating promo...',
			success: 'Promo created successfully',
			error: 'Failed to create promo',
		})
	}

	useEffect(() => {
		const getCompanies = async () => {
			setIsLoading(true)
			const companies = await getCompaniesAction()
			setIsCompanies(companies)
			setIsLoading(false)
		}
		getCompanies()
	}, [])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<div className='grid grid-cols-2 space-x-4'>
					<FormField
						control={form.control}
						name='title_uz'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input disabled={isLoading} className='h-14 resize-none' placeholder={'title'} {...field} />
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
									<Input disabled={isLoading} className='h-14 resize-none' placeholder={'title'} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-3 space-x-4'>
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input disabled={isLoading} className='h-14 resize-none' placeholder={'Code'} {...field} />
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
									<Input disabled={isLoading} className='h-14 resize-none' placeholder={'Code'} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='company_id'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
									<FormControl>
										<SelectTrigger className='h-14 resize-none'>
											<SelectValue placeholder='Select a company' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{isCompaneis?.map((item: ICompany) => (
											<SelectItem key={item._id?.toString()} value={item._id?.toString() ?? ''}>
												{item?.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-2 space-x-4'>
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
				</div>
				<div className='flex items-center space-x-4 justify-end'>
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
					<Button className='w-fit rounded-full' size={'lg'} type='submit' disabled={isLoading}>
						<span>send</span>
						<Send className='ml-2 size-4' />
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default PromoForm
