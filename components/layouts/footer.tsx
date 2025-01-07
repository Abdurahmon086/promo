import Link from 'next/link'
import { Button } from '../ui/button'

function Footer() {
	return (
		<div className='container'>
			{/* <div className=''>
				<Logo />
			</div> */}
			<p className='text-center text-sm py-3'>
				© Developed by <span></span>
				<Button variant={'link'} asChild className='!p-0'>
					<Link href={'https://github.com/Abdurahmon086'} target='_blank' className=''>
						Abdurahmon
					</Link>
				</Button>
				. 2025
			</p>
		</div>
	)
}

export default Footer
