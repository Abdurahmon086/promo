import { searchPromo } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import PromocodeCard from '@/components/cards/promocode-card'

interface searchParamsProps {
	searchParams: Promise<{ search?: string | undefined }>
}

async function Search({ searchParams }: searchParamsProps) {
	const searchParam = await searchParams
	const value = searchParam?.search || ''

	const data = await searchPromo(value)
	console.log(data)
	return (
		<div className='mt-12'>
			<section className='container'>
				<h4 className='title'>
					Natija: <span className='text-primary'>{value}</span>
				</h4>
				<div className='grid grid-cols-4 mt-5'>
					<ul className='col-span-3'>
						{data?.map((item: IPromo) => (
							<li key={item?._id}>
								<PromocodeCard item={item} />
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	)
}

export default Search
