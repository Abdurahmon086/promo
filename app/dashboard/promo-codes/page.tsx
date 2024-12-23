import { getPromos } from '@/actions/promo.action'
import PromosTable from '@/components/tables/promos-table'
import HeaderDash from '../_components/header'

async function PromoCodes() {
	const promos = await getPromos()
	return (
		<>
			<HeaderDash head='Promo Codes' head_link='/dashboard/promo-codes' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<PromosTable promos={promos} />
			</div>
		</>
	)
}

export default PromoCodes
