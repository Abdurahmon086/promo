import { ThemeProvider } from '@/components/providers/theme.provider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

export const metadata: Metadata = {
	metadataBase,
	icons: '/logo.svg',
	alternates: {
		canonical: 'https://promocodes.uz/',
		languages: {
			'uz-UZ': '/',
		},
	},
	verification: {
		google: 'google',
		yandex: 'yandex',
		yahoo: 'yahoo',
	},
	applicationName: "Promo codes: Eng ohirgi promokodlar to'plamlari",
	referrer: 'origin-when-cross-origin',
	keywords: ['Promo', 'code', 'promocode', 'O‘zbekiston yangiliklari', 'yandex eats', 'uzum tezkor', 'wolt', 'promocodes.uz', 'promocodes'],
	authors: [{ name: 'promocodes.uz' }, { name: 'promocodes.uz', url: 'https://promocodes.uz' }],
	creator: 'promocodes.uz',
	publisher: 'promocodes.uz',
	formatDetection: {
		email: true,
		address: true,
		telephone: true,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<div>{children}</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
