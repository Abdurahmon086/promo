import CompanyForm from '@/components/forms/company.form'
import HeaderDash from '../../_components/header'

export default function Page() {
	return (
		<>
			<HeaderDash head='Companies' head_link='dashboard/companies' title='Add Companies' />
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<div className='rounded-2xl bg-muted/50 p-4'>
					<CompanyForm />
				</div>
			</div>
		</>
	)
}
