import { getCompaniesAction } from '@/actions/company.action'
import { getPromos } from '@/actions/promo.action'
import { IPromo } from '@/actions/types'
import CompanyCard from '@/components/cards/company-card'
import PromocodeCard from '@/components/cards/promocode-card'
import { ICompany } from '@/types'
import { Building2, TicketPercent } from 'lucide-react'

async function Home() {
	const companies = await getCompaniesAction()
	const promos = await getPromos()
	return (
		<>
			<section className='companies container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<Building2 /> Companies
				</h4>
				<div className='grid grid-cols-6 gap-5 mt-3'>
					{companies.map((item: ICompany) => (
						<CompanyCard key={item?._id} item={item} />
					))}
				</div>
			</section>
			<section className='promocodes container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<TicketPercent /> Promo Codes
				</h4>
				<div className='flex'>
					<div className='grid grid-cols-1 gap-4 mt-5 w-3/4'>{promos && promos?.map((item: IPromo) => <PromocodeCard key={item?._id} item={item} />)}</div>
					<div className='w-1/4'></div>
				</div>
			</section>
		</>
	)
}

export default Home
