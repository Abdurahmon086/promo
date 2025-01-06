import CustomImage from '@/components/shared/custom-image'
import { LoginForm } from '@/components/shared/login-form'
import Logo from '@/components/shared/logo'

async function SignUp() {
	return (
		<section>
			<div className='grid min-h-svh lg:grid-cols-2'>
				<div className='flex flex-col gap-4 p-6 md:p-10'>
					<div className='flex justify-center gap-2 md:justify-start'>
						<Logo />
					</div>
					<div className='flex flex-1 items-center justify-center'>
						<div className='w-full max-w-xs'>
							<LoginForm type='sign-up' />
						</div>
					</div>
				</div>
				<div className='relative hidden bg-muted lg:block overflow-hidden '>
					<CustomImage
						src='https://get.wallhere.com/photo/digital-art-abstract-space-sky-glowing-CGI-symmetry-blue-circle-lines-darkness-energy-graphics-1920x1200-px-computer-wallpaper-fractal-art-special-effects-electric-blue-775981.jpg'
						alt='Image'
						className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
					/>
				</div>
			</div>
		</section>
	)
}

export default SignUp
