import { ICompany } from '@/types'
import Link from 'next/link'
import CustomImage from '../shared/custom-image'

function CompanyCard({ item }: { item: ICompany }) {
	return (
		<div className='overflow-hidden rounded-2xl'>
			<Link href='/' className='block relative w-full aspect-[1.7]'>
				<CustomImage src={`/images/${item?.image}.jpg`} alt={item?.title} />
			</Link>
		</div>
	)
}

export default CompanyCard
