'use client'
import { IPromo } from '@/actions/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'

function PromoModal({ item }: { item: IPromo }) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const handleCopy = async () => {
		try {
			if (item?.code) {
				await navigator.clipboard.writeText(item?.code)
				setIsLoading(true)
				setTimeout(() => setIsLoading(false), 1000)
			}
		} catch (error) {
			console.error('Failed to copy: ', error)
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='sm:w-full' disabled={!item?.active}>
					Ochish
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader>
					<DialogTitle asChild>
						<h4 className='title !text-3xl'> {item?.title_uz}</h4>
					</DialogTitle>
					<DialogDescription className='text-base'>{item?.description_uz}</DialogDescription>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<Input defaultValue={item?.code} readOnly className='h-14 !text-2xl' />
					</div>
					<Button type='submit' className='px-3 size-14 relative' onClick={handleCopy}>
						<span className={cn('absolute -top-8 left-1 bg-foreground rounded py-1 px-2', isLoading ? 'block' : 'hidden')}>Copy</span>
						<Copy className='!size-8' />
					</Button>
				</div>
				<div className='text-center'>
					<Button className='underline' variant={'link'} onClick={() => window.open(item?.company_id?.website)}>
						Do‘konga borish
					</Button>
				</div>
				<DialogFooter className='sm:justify-start'>
					<DialogClose asChild>
						<Button type='button' variant='secondary' className='text-xl w-full'>
							Yopish
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default PromoModal
