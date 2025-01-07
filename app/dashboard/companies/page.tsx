import { getCompaniesAction } from '@/actions/company.action'
import DashCompCard from '@/components/cards/dash-comp-card'
import { ICompany } from '@/types'
import { Metadata } from 'next'
import HeaderDash from '../_components/header'

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCompaniesAction()

	const sharedMeta = {
		title: data[0]?.title || 'Promocodes.uz',
		description: data[0]?.description || 'Default description',
		images: `/images/${data[0]?.image}.jpg` || '/logo.svg',
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

async function Companies() {
	const data = await getCompaniesAction()

	return (
		<>
			<HeaderDash head='Companies' head_link='dashboard/companies' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<div className='grid grid-cols-1 space-y-4'>
					{data.map((item: ICompany) => (
						<DashCompCard key={item?._id} item={item} />
					))}
				</div>
			</div>
		</>
	)
}

export default Companies
