'use client'
import { createPromo } from '@/actions/promo.action'
import CompanyCard from '@/components/cards/company-card'
import PromocodeCard from '@/components/cards/promocode-card'
import { CheckSquare2Icon, HomeIcon } from 'lucide-react'

function Home() {
	const addSm = async () => {
		await createPromo()
	}
	return (
		<>
			<section className='companies container my-10'>
				<h4 className='title flex gap-2 items-center'>
					<HomeIcon /> Companies
				</h4>
				<div className='grid grid-cols-6 gap-5 mt-3'>
					{[1, 2, 3, 4, 5, 6].map((_item, i) => (
						<CompanyCard key={i} />
					))}
				</div>
			</section>
			<section className='promocodes container my-10'>
				<h4 className='title flex gap-2 items-center' onClick={() => addSm()}>
					<CheckSquare2Icon /> Promo Codes
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
