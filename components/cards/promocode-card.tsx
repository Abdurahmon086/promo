import { IPromo } from '@/actions/types'
import { ActivityIcon, Share2Icon } from 'lucide-react'
import CustomImage from '../shared/custom-image'
import { Button } from '../ui/button'

function PromocodeCard({ item }: { item: IPromo }) {
	return (
		<div className='card__wrapper w-full h-40 flex rounded-2xl shadow-md shadow-primary/15 hover:scale-[1.01] transition-transform  overflow-hidden border'>
			<div className='relative w-1/4 aspect-[1.7] rounded-tl-2xl rounded-bl-2xl overflow-hidden'>
				<CustomImage src={`/images/${item?.company_id?.image}.jpg`} alt={item?.company_id?.title} />
			</div>
			<div className='card__left w-2/4 py-3  px-5 border-x'>
				<h4 className='text-xl font-medium'>{item?.title_uz}</h4>
				<p className='text-sm mt-2'>{item?.description_uz}</p>
				<div className=' flex items-center space-x-2 text-sm'>
					<div className='flex gap-2 items-center'>
						<ActivityIcon />
						<p> {item?.active ? 'Active' : 'No Active'}</p>
					</div>
					<div className='flex gap-2 items-center'>
						<Share2Icon />
						<p>Share</p>
					</div>
				</div>
			</div>
			<div className='card__right w-1/4 py-5 px-10 rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center gap-3'>
				<h5 className='text-2xl text-center'>{item?.price} som</h5>
				<Button className='w-full'>Open</Button>
			</div>
		</div>
	)
}

export default PromocodeCard
