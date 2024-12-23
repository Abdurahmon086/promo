import PromoForm from '@/components/forms/promo.form'
import HeaderDash from '../../_components/header'

function Add() {
	
	return (
		<>
			<HeaderDash head='Promo Codes' head_link='dashboard/promocodes' title='Add Promo Code' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<div className=' rounded-xl bg-muted/50 p-4'>
					<PromoForm />
				</div>
			</div>
		</>
	)
}

export default Add
