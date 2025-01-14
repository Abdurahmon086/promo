import { getCompaniesAction } from '@/actions/company.action'
import { getPromos } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import CompanyCard from '@/components/cards/company-card'
import PromocodeCard from '@/components/cards/promocode-card'
import Pagination from '@/components/shared/pagination'
import { ICompany, SearchParamsProps } from '@/types'
import { Building2, TicketPercent } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Promocodes.uz',
		template: '%s | Promocodes.uz',
	},
	description: 'Promocodes.uz - O‘zbekiston vs jahondagi eng muhim va dolzarb masalalarning tahlili. Eng so‘nggi yangiliklar, tahlillar va sharhlar.',
	openGraph: {
		title: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		description: 'Promocodes.uz - O‘zbekiston vs jahondagi eng muhim va dolzarb masalalarning tahlili. Eng so‘nggi yangiliklar, tahlillar va sharhlar.',
		url: 'https://promocodes.uz/',
		siteName: 'promocodes.uz',
		images: [
			{
				url: '/logo.svg',
				type: 'image/svg',
				width: 1080,
				height: 630,
				alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
			},
			{
				url: '/images/logo.svg',
				type: 'image/svg',
				width: 600,
				height: 314,
				alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
			},
		],
		locale: 'uz_UZ',
		type: 'website',
		phoneNumbers: '+998930499591',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		description: 'Promocodes.uz - O‘zbekiston va jahondagi eng muhim va dolzarb masalalarning tahlili.',
		site: 'promocodes.uz',
		images: {
			url: '/logo.svg',
			type: 'image/svg',
			alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		},
	},
}

async function Home({ searchParams }: SearchParamsProps) {
	const params = await searchParams
	const page = Number(params?.page) || 1

	const companies = await getCompaniesAction()
	const { promos, isNext } = await getPromos({ page, pageSize: 3 })
	return (
		<>
			<section className='companies container my-10'>
				<h4 className='title flex gap-2 items-center mb-5 sm:mb-3'>
					<Building2 /> Kampanyalar
				</h4>
				<div className='overflow-x-auto'>
					<ul className='flex gap-5'>
						{companies.map((item: ICompany) => (
							<li key={item?._id}>
								<CompanyCard item={item} />
							</li>
						))}
					</ul>
				</div>
			</section>
			<section className='promocodes container my-10'>
				<h4 className='title flex gap-2 items-center '>
					<TicketPercent /> Promo kodlar
				</h4>
				<div className='grid grid-cols-1 sm:grid-cols-4'>
					<ul className='col-span-3 w-full grid grid-cols-1 gap-4 mt-5 '>
						{promos &&
							promos?.map((item: IPromo) => (
								<li key={item?._id}>
									<PromocodeCard item={item} />
								</li>
							))}
						<Pagination isNext={isNext} pageNumber={page} />
					</ul>

					<div className='col-span-1'></div>
				</div>
			</section>
		</>
	)
}

export default Home
