import PromoModal from '../modals/search.modal'
import Logo from '../shared/logo'
import { ModeToggle } from '../shared/modal-toggle'

function Header() {
	return (
		<div className='container mt-4 border-2 rounded-3xl shadow-md bg-background/90'>
			<div className='flex items-center py-5 '>
				<Logo />

				<div className='ml-auto flex gap-3 items-center'>
					<PromoModal />
					<div className=''>
						<ModeToggle />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
