import { IPromo } from '@/actions/types'
import { cn } from '@/lib/utils'
import PromoModal from '../modals/promo.modal'
import CustomImage from '../shared/custom-image'

function PromocodeCard({ item }: { item: IPromo }) {
	return (
		<div className='card__wrapper w-full  flex flex-col sm:flex-row rounded-2xl shadow-md shadow-primary/15 hover:scale-[1.01] transition-transform overflow-hidden border'>
			<div className='relative sm:w-1/4 aspect-[1.7] sm:h-40 rounded-tl-2xl sm:rounded-bl-2xl overflow-hidden'>
				<CustomImage src={`/images/${item?.company_id?.image}.jpg`} alt={item?.company_id?.title} />
			</div>
			<div className='card__left flex flex-col h-full sm:w-2/4 py-2 sm:py-3 px-3 sm:px-5  sm:border-x'>
				<h4 className='text:base sm:text-xl font-medium flex-1 line-clamp-3'>{item?.title_uz}</h4>
				<div className=' flex items-center space-x-2 text-sm'>
					<div className='flex gap-2 items-center mt-2'>
						<div className={cn('size-3 rounded-full ', item?.active ? 'bg-green-400' : 'bg-red-600')}></div>
						<p className='text:sm sm:text-base'> {item?.active ? 'Ishlaydi' : "Ishlash mudati o'tgan"}</p>
					</div>
				</div>
			</div>
			<div className='card__right  sm:w-1/4 py-2 sm:py-5 px-3 sm:px-10 rounded-tr-2xl rounded-br-2xl flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3'>
				<h5 className='text-xl sm:text-2xl text-right sm:text-center font-bold'>{item?.price} som</h5>
				<PromoModal item={item} />
			</div>
		</div>
	)
}

export default PromocodeCard
