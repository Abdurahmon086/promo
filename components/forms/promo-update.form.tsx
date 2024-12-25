'use client'

import { getCompaniesAction } from '@/actions/company.action'
import { getPromoById, updatePromo } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import { useReview } from '@/hooks/use-review'
import { promoAddSchema } from '@/lib/validation'
import { ICompany } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import LoadingComponents from '../shared/loading-components'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

function PromoUpdateForm({ id }: { id: string }) {
	const [promo, setPromo] = useState<IPromo | null>(null)
	const [componies, setCompanies] = useState<ICompany[] | null>([])
	const { isLoading, onClose, startLoading, stopLoading, isOpen } = useReview()
	const path = usePathname()

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
		startLoading()
		const promise = updatePromo(id, { ...values }, path)
			.then(() => onClose())
			.finally(() => stopLoading())

		toast.promise(promise, {
			loading: 'Updating promo...',
			success: 'Promo updated successfully',
			error: 'Failed to update promo',
		})
	}

	useEffect(() => {
		const getPromo = async () => {
			startLoading()
			const res = await getPromoById(id)
			const resComp = await getCompaniesAction()
			if (res && resComp) {
				setPromo(res)
				setCompanies(resComp)

				form.setValue('title_uz', res.title_uz)
				form.setValue('title_ru', res.title_ru)
				form.setValue('description_uz', res.description_uz)
				form.setValue('description_ru', res.description_ru)
				form.setValue('active', res.active)
				form.setValue('code', res.code)
				form.setValue('price', res.price)
				form.setValue('company_id', res.company_id.image)
			}
			stopLoading()
		}
		getPromo()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])
	if (isLoading) return <LoadingComponents />
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-3'>
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='h-14 resize-none'>
										<SelectValue placeholder='Select a company' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{componies?.map((item: ICompany) => (
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

				<FormField
					control={form.control}
					name='description_uz'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Short description<span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Textarea {...field} className='h-32 bg-secondary' placeholder='Description' disabled={isLoading} />
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
								<Textarea {...field} className='h-32 bg-secondary' placeholder='Description' disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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

export default PromoUpdateForm
