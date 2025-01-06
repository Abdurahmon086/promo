import { getCompaniesAction } from '@/actions/company.action'
import { getPromos } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import CompanyCard from '@/components/cards/company-card'
import PromocodeCard from '@/components/cards/promocode-card'
import Pagination from '@/components/shared/pagination'
import { ICompany, SearchParamsProps } from '@/types'
import { Building2, TicketPercent } from 'lucide-react'

async function Home({ searchParams }: SearchParamsProps) {
	const params = await searchParams
	const page = Number(params.page) || 1
	
	const companies = await getCompaniesAction()
	const { promos, isNext } = await getPromos({ page, pageSize: 3 })
	return (
		<>
			<section className='companies container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<Building2 /> Kampanyalar
				</h4>
				<div className='grid grid-cols-6 gap-5 mt-3'>
					{companies.map((item: ICompany) => (
						<CompanyCard key={item?._id} item={item} />
					))}
				</div>
			</section>
			<section className='promocodes container my-10'>
				<h4 className='title flex gap-2 items-center '>
					<TicketPercent /> Promo kodlar
				</h4>
				<div className='grid grid-cols-4'>
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
