import Footer from '@/components/layouts/footer'
import Header from '@/components/layouts/header'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<header className='fixed top-0 left-0 w-full z-50 '>
				<Header />
			</header>
			<main className='mt-[130px] flex-grow '>{children}</main>
			<footer className='bg-background/90 border-2 shadow-2xl rounded-t-[50px] py-8'>
				<Footer />
			</footer>
		</>
	)
}
