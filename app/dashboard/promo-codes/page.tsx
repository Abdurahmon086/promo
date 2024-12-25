import { getPromos } from '@/actions/promo.action'
import PromosTable from '@/components/tables/promos-table'
import { SearchParamsProps } from '@/types'
import HeaderDash from '../_components/header'

async function PromoCodes({ searchParams }: SearchParamsProps) {
	const page = Number(searchParams?.page) || 1

	const { promos, isNext } = await getPromos({ page, pageSize: 20 })
	return (
		<>
			<HeaderDash head='Promo Codes' head_link='/dashboard/promo-codes' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<PromosTable promos={promos} isNext={isNext} pageNumber={page} />
			</div>
		</>
	)
}

export default PromoCodes
