import { getPromos } from '@/actions/promo.action'
import PromosTable from '@/components/tables/promos-table'
import { SearchParamsProps } from '@/types'
import { Metadata } from 'next'
import HeaderDash from '../_components/header'

export async function generateMetadata(): Promise<Metadata> {
	const { promos: data } = await getPromos({ page: 1, pageSize: 20 })

	const sharedMeta = {
		title: data[0]?.title_uz || 'Promocodes.uz',
		description: data[0]?.description_uz || 'Default description',
		images: `/images/${data[0]?.company_id?.image}.jpg` || '/logo.svg',
	}

	return {
		title: sharedMeta.title,
		description: sharedMeta.description,
		category: sharedMeta.title,
		keywords: ['promo', 'compny', 'codes'],

		openGraph: {
			...sharedMeta,
			url: 'https://promocodes.uz/',
			siteName: 'Promocodes.uz',
			images: [
				{
					url: sharedMeta.images,
					alt: sharedMeta.title,
					type: 'image/jpeg',
					width: 1200,
					height: 630,
				},
				{
					url: sharedMeta.images,
					alt: sharedMeta.title,
					type: 'image/jpeg',
					width: 1800,
					height: 1600,
				},
				{
					url: sharedMeta.images,
					alt: sharedMeta.title,
					type: 'image/jpeg',
					width: 1080,
					height: 1080,
				},
				{
					url: sharedMeta.images,
					alt: sharedMeta.title,
					type: 'image/jpeg',
					width: 600,
					height: 314,
				},
			],
			locale: 'uz_UZ',
			type: 'website',
			phoneNumbers: '+998930499591',
		},
		twitter: {
			card: 'summary_large_image',
			...sharedMeta,
			images: {
				url: sharedMeta.images,
				alt: sharedMeta.title,
				type: 'image/jpeg',
			},
			site: 'Promocodes.uz',
		},
	}
}

async function PromoCodes({ searchParams }: SearchParamsProps) {
	const searchParam = await searchParams
	const page = Number(searchParam?.page) || 1

	const { promos, isNext } = await getPromos({ page, pageSize: 20 })
	return (
		<>
			<HeaderDash head='Promo Codes' head_link='/dashboard/promo-codes' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<PromosTable promos={promos} isNext={isNext} pageNumber={page} />
			</div>
		</>
	)
}

export default PromoCodes
