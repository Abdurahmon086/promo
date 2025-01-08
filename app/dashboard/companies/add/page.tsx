import CompanyForm from '@/components/forms/company.form'
import { Metadata } from 'next'
import HeaderDash from '../../_components/header'

export const metadata: Metadata = {
	title: {
		default: 'Company add ',
		template: '%s | Promocodes.uz',
	},
	description: 'Promocodes.uz - O‘zbekiston vs jahondagi eng muhim va dolzarb masalalarning tahlili. Eng so‘nggi yangiliklar, tahlillar va sharhlar.',
	openGraph: {
		title: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		description: 'Promocodes.uz - O‘zbekiston vs jahondagi eng muhim va dolzarb masalalarning tahlili. Eng so‘nggi yangiliklar, tahlillar va sharhlar.',
		url: 'https://promocodes.uz/',
		siteName: 'promocodes.uz',
		images: [
			{
				url: '/logo.svg',
				type: 'image/svg',
				width: 1080,
				height: 630,
				alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
			},
			{
				url: '/images/logo.svg',
				type: 'image/svg',
				width: 600,
				height: 314,
				alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
			},
		],
		locale: 'uz_UZ',
		type: 'website',
		phoneNumbers: '+998930499591',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		description: 'Promocodes.uz - O‘zbekiston va jahondagi eng muhim va dolzarb masalalarning tahlili.',
		site: 'promocodes.uz',
		images: {
			url: '/logo.svg',
			type: 'image/svg',
			alt: 'Promocodes.uz: Eng muhim va dolzarb masalalar tahlili',
		},
	},
}
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
