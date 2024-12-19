import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'
import { ThemeProvider } from '@/components/providers/theme.provider'
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

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
					<header className='fixed top-0 left-0 w-full bg-background/85 z-50 '>
						<Header />
					</header>
					<main className='mt-[64px] flex-grow '>{children}</main>
					<footer>
						<Footer />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	)
}
