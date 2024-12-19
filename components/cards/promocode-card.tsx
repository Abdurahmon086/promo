import { ActivityIcon, Share2Icon } from 'lucide-react'
import CustomImage from '../shared/custom-image'
import { Button } from '../ui/button'

function PromocodeCard() {
	return (
		<div className='card__wrapper w-full h-40 flex rounded-2xl shadow-md shadow-primary/15 hover:scale-[1.01] transition-transform  overflow-hidden border'>
			<div className='relative w-1/4 aspect-[1.7] rounded-tl-2xl rounded-bl-2xl overflow-hidden'>
				<CustomImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKxXiGcLHx_-SEJUH1wKHhsH7nrVarcCWFw&s' alt='company image' />
			</div>
			<div className='card__left w-2/4 py-3  px-5 border-x'>
				<h4 className='text-xl font-medium'>«1=2»! Второе блюдо бесплатно к заказу!</h4>
				<div className='flex items-center space-x-2 text-sm'>
					<div className='flex gap-2 items-center'>
						<ActivityIcon />
						<p>Active</p>
					</div>
					<div className='flex gap-2 items-center'>
						<Share2Icon />
						<p>Share</p>
					</div>
				</div>
			</div>
			<div className='card__right w-1/4 py-5 px-10 rounded-tr-2xl rounded-br-2xl flex flex-col items-center justify-center gap-3'>
				<h5 className='text-2xl text-center'>45.000 som</h5>
				<Button className='w-full'>Open</Button>
			</div>
		</div>
	)
}

export default PromocodeCard
