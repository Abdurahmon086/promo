import Image from 'next/image'
import Link from 'next/link'

function Logo() {
	return (
		<Link href='/'>
			<div className='relative w-[176px] h-[40px]'>
				<Image src='/logo-full.svg' alt='promo codes logo' fill />
			</div>
		</Link>
	)
}

export default Logo
