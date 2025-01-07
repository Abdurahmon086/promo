import { searchPromo } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import PromocodeCard from '@/components/cards/promocode-card'
import { Metadata, ResolvingMetadata } from 'next'

interface searchParamsProps {
	searchParams: Promise<{ search?: string | undefined }>
}
export async function generateMetadata({ searchParams }: searchParamsProps, parent: ResolvingMetadata): Promise<Metadata> {
	const searchParam = await searchParams
	const value = searchParam?.search || ''
	const data = (await searchPromo(value)) ?? []
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: value ? `${value} | promocode.uz` : 'promocode.uz',
		description: `${data[0]?.description_uz}` || 'promocode.uz',
		category: `${data[0]?.company_id?.title}` || 'promocode.uz',
		keywords: ['search', value, 'promo', 'promocodes'],

		openGraph: {
			images: [`${data[0]?.company_id?.image ?? '/logo.svg'} `, ...previousImages],
		},
	}
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
