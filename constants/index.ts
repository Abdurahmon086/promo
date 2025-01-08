interface NavItem {
	id: number
	title: string
	url: string
	items?: NavItem[] // `items` ixtiyoriy qilib belgilandi
}

export const data: { navMain: NavItem[] } = {
	navMain: [
		{
			id: 1,
			title: 'Documentation',
			url: '/dashboard',
			items: [
				{
					id: 1,
					title: 'Installation',
					url: '#',
				},
				{
					id: 2,
					title: 'Project Structure',
					url: '#',
				},
			],
		},
		{
			id: 2,
			title: 'Promo codes',
			url: '/dashboard/promo-codes',
			items: [
				{
					id: 1,
					title: 'Add Promo code',
					url: '/dashboard/promo-codes/add',
				},
			],
		},
		{
			id: 3,
			title: 'Companies',
			url: '/dashboard/companies',
			items: [
				{
					id: 1,
					title: 'Add Company',
					url: '/dashboard/companies/add',
				},
			],
		},
	],
}
