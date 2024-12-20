import { getCompaniesAction } from '@/actions/company.action'
import CompanyCard from '@/components/cards/company-card'
import PromocodeCard from '@/components/cards/promocode-card'
import { Building2, TicketPercent } from 'lucide-react'

async function Home() {
	const companiesasdasd = await getCompaniesAction()
	return (
		<>
			<section className='companies container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<Building2 /> Companies
				</h4>
				<div className='grid grid-cols-6 gap-5 mt-3'>
					{companiesasdasd.map(item => (
						<CompanyCard key={item?.id} item={item} />
					))}
				</div>
			</section>
			<section className='promocodes container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<TicketPercent /> Promo Codes
				</h4>
				<div className='flex'>
					<div className='grid grid-cols-1 gap-4 mt-5 w-3/4'>
						{[1, 2, 3, 4, 5, 6].map((_item, i) => (
							<PromocodeCard key={i} />
						))}
					</div>
					<div className='w-1/4'></div>
				</div>
			</section>
		</>
	)
}

export default Home
