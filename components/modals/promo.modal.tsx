'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useReview } from '@/hooks/use-review'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoadingComponents from '../shared/loading-components'

function PromoModal({ active }: { active: boolean }) {
	const { startLoading, isOpen, isLoading, stopLoading, onClose } = useReview()
	const [value, setValue] = useState<string>('')
	const router = useRouter()

	const handleSearch = () => {
		startLoading()
		router.push(`/search?search=${encodeURIComponent(value)}`)
		onClose()
		stopLoading()
	}
	if (isLoading) return <LoadingComponents />
	return (
		<Dialog defaultOpen={isOpen}>
			<DialogTrigger asChild>
				<Button disabled={active} className={cn('w-full')}>
					Ochish
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Qidirish</DialogTitle>
					<DialogDescription>Promo kodlarni qidirning</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='items-center gap-4'>
						<Input id='name' placeholder='Qidirish..' className='col-span-3' onChange={e => setValue(e.target.value)} />
					</div>
					<Button disabled={isLoading} type='submit' onClick={handleSearch}>
						Yuborish
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default PromoModal
