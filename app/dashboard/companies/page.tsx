import { getCompaniesAction } from '@/actions/company.action'
import DashCompCard from '@/components/cards/dash-comp-card'
import HeaderDash from '../_components/header'

async function Companies() {
	const data = await getCompaniesAction()

	return (
		<>
			<HeaderDash head='Companies' head_link='dashboard/companies' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<div className='grid grid-cols-1 space-y-4'>
					{data.map(item => (
						<DashCompCard key={item?.id} item={item} />
					))}
				</div>
			</div>
		</>
	)
}

export default Companies
