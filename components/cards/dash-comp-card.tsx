'use client'

import { deleteCompanyAction } from '@/actions/company.action'
import { ICompany } from '@/types'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import DashCompModal from '../modals/dash-comp.modal'
import CustomImage from '../shared/custom-image'
import { Button } from '../ui/button'

function DashCompCard({ item }: { item: ICompany }) {
	const [isLoading, setIsLoading] = useState(false)
	const path = usePathname()
	const handleDelete = (id: string | undefined) => {
		setIsLoading(true)
		const promise = deleteCompanyAction(id, path).finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Deleting Company...',
			success: 'Company Deleted',
			error: 'Failed to delete Company',
		})
	}
	return (
		<>
			<div className='w-full flex items-center gap-4 bg-muted/50 rounded-2xl p-3 '>
				<div className='flex items-center space-x-5'>
					<div className='w-[200px] aspect-[1.7] relative '>
						<CustomImage src={`/images/${item?.image}.jpg`} alt={item?.title} className='rounded-2xl' />
					</div>
					<div className='w-fit flex-1'>
						<h4 className='text-2xl font-bold mb-2'>{item?.title}</h4>
						<p>{item?.description}</p>
					</div>
				</div>
				<div className='flex items-center space-x-3 ml-auto'>
					<DashCompModal id={item?._id ?? ''} />
					<Button disabled={isLoading} variant='destructive' size={'lg'} onClick={() => handleDelete(item?._id)}>
						<Trash2 />
					</Button>
				</div>
			</div>
		</>
	)
}

export default DashCompCard
