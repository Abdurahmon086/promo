'use client'

import { creatCompanyAction } from '@/actions/company.action'
import { companyAddSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

function CompanyForm() {
	const [isLoading, setIsLoading] = useState(false)

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
		setIsLoading(true)
		const promise = creatCompanyAction({
			...values,
		})
			.then(() => form.reset())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Creating company...',
			success: 'Company created successfully',
			error: 'Failed to create company',
		})
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
										<SelectItem value='1'>1</SelectItem>
										<SelectItem value='2'>2</SelectItem>
										<SelectItem value='3'>3</SelectItem>
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
						<span>send</span>
						<Send className='ml-2 size-4' />
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default CompanyForm
