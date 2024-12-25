'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useReview } from '@/hooks/use-review'
import PromoUpdateForm from '../forms/promo-update.form'
import { Separator } from '../ui/separator'

function DashPromoModal({ id }: { id: string }) {
	const { isOpen, onOpen, onClose } = useReview()

	return (
		<Dialog open={isOpen} onOpenChange={open => (open ? onOpen() : onClose())}>
			<DialogTrigger asChild>
				<div className='px-2 py-1.5 text-sm hover:bg-muted rounded-sm cursor-pointer'>Edit</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you update company sure?</DialogTitle>
				</DialogHeader>
				<Separator />
				<DialogFooter>
					<PromoUpdateForm id={id} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DashPromoModal
