import Link from 'next/link'
import CustomImage from '../shared/custom-image'

function CompanyCard() {
	return (
		<div className='overflow-hidden rounded-2xl'>
			<Link href='/' className='block relative w-full aspect-[1.7]'>
				<CustomImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKxXiGcLHx_-SEJUH1wKHhsH7nrVarcCWFw&s' alt='asd' />
			</Link>
		</div>
	)
}

export default CompanyCard
