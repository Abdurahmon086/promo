import Logo from '../shared/logo'
import { ModeToggle } from '../shared/modal-toggle'

function Header() {
	return (
		<div className='container'>
			<div className='flex items-center py-3'>
				<Logo />

				<div className='ml-auto flex gap-5 items-center'>
					search
					<div className=''>
						<ModeToggle />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
