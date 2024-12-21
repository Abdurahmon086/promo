'use client'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useReview } from '@/hooks/use-review'
import { Edit2 } from 'lucide-react'
import CompanyForm from '../forms/company.form'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

function DashCompModal({ id }: { id: string }) {
	const { isOpen, onOpen, onClose } = useReview()

	return (
		<Dialog open={isOpen} onOpenChange={open => (open ? onOpen() : onClose())}>
			<DialogTrigger asChild>
				<Button size={'lg'}>
					<Edit2 />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you update company sure?</DialogTitle>
				</DialogHeader>
				<Separator />
				<DialogFooter>
					<CompanyForm name='update' id={id} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DashCompModal
