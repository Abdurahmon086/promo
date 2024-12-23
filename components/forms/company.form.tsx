'use client'

import { creatCompanyAction, getCompaniesByIdAction, updateCompanyAction } from '@/actions/company.action'
import { useReview } from '@/hooks/use-review'
import { companyAddSchema } from '@/lib/validation'
import { ICompany } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
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

function CompanyForm({ name, id }: { name?: string; id?: string }) {
	const { isLoading, onClose, startLoading, stopLoading, isOpen } = useReview()
	const path = usePathname()

	const form = useForm<z.infer<typeof companyAddSchema>>({
		resolver: zodResolver(companyAddSchema),
		defaultValues: {
			title: '',
			description: '',
			image: '',
			website: '',
			active: false,
		},
	})

	function onSubmit(values: z.infer<typeof companyAddSchema>) {
		startLoading()

		let promise
		if (name === 'update' && id) {
			promise = updateCompanyAction(
				id,
				{
					...values,
				},
				path
			)
				.then(() => {
					form.reset()
					onClose()
				})
				.finally(() => stopLoading())
		} else {
			promise = creatCompanyAction({
				...values,
			})
				.then(() => form.reset())
				.finally(() => stopLoading())
		}

		toast.promise(promise, {
			loading: `${name ? name : 'Creating'} company...`,
			success: `Company ${name ? name : 'Created'} successfully`,
			error: `Failed to ${name ? name : 'Create'} company`,
		})
	}

	useEffect(() => {
		const fetchCompany = async () => {
			if (!id) return
			startLoading()
			const res: ICompany = await getCompaniesByIdAction(id)
			if (res) {
				form.setValue('title', res?.title)
				form.setValue('active', res?.active)
				form.setValue('website', res?.website)
				form.setValue('description', res?.description)
			}
			stopLoading()
		}
		fetchCompany()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	if (name === 'update' && isLoading) {
		return <LoadingComponents />
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<div className='grid grid-cols-3 space-x-4'>
					<FormField
						control={form.control}
						name='title'
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
						name='website'
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
						name='image'
						render={({ field }) => (
							<FormItem>
								<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
									<FormControl>
										<SelectTrigger className='h-14 resize-none'>
											<SelectValue placeholder='Select a company' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='1'>Yandex</SelectItem>
										<SelectItem value='2'>Uzum Tezkor</SelectItem>
										<SelectItem value='3'>Wolt</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='description'
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
						<span>{name ? name : 'Send'}</span>
						<Send className='ml-2 size-4' />
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default CompanyForm
