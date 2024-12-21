import { Loader2 } from 'lucide-react'

function LoadingComponents() {
	return (
		<article className='w-full h-full flex items-center justify-center bg-background '>
			<div className='animate-spin'>
				<Loader2 className='w-10 h-10 text-primary' />
			</div>
		</article>
	)
}

export default LoadingComponents
