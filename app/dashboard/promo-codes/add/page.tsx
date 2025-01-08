import PromoForm from '@/components/forms/promo.form'
import HeaderDash from '../../_components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: {
		default: 'Promo add',
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
