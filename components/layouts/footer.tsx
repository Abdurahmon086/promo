import Link from 'next/link'
import Logo from '../shared/logo'

function Footer() {
	return (
		<div className='container'>
			<div className=''>
				<Logo />
			</div>
			<p className='text-center text-sm py-3'>
				© Developed by <span></span>
				<Link href={'https://github.com/Abdurahmon086'} target='_blank' className='text-yellow-400'>
					Abdurahmon
				</Link>
				. 2024
			</p>
		</div>
	)
}

export default Footer
