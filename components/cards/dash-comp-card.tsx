import { ICompany } from '@/types'
import { Edit2, Trash2 } from 'lucide-react'
import CustomImage from '../shared/custom-image'
import { Button } from '../ui/button'

function DashCompCard({ item }: { item: ICompany }) {
	return (
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
				<Button size={'lg'}>
					<Edit2 />
				</Button>
				<Button variant='destructive' size={'lg'}>
					<Trash2 size={'2xl'} />
				</Button>
			</div>
		</div>
	)
}

export default DashCompCard
