import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar'

type HeaderDashProps = {
	head: string
	head_link: string
	title?: string
}

function HeaderDash({ head, head_link, title }: HeaderDashProps) {
	return (
		<header className='flex h-16 shrink-0 items-center gap-2 border-b'>
			<div className='flex items-center gap-2 px-3'>
				<SidebarTrigger />
				<SidebarSeparator orientation='vertical' className='mr-2 h-4' />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink href={head_link}>{head}</BreadcrumbLink>
						</BreadcrumbItem>
						{title && <BreadcrumbSeparator className='hidden md:block' />}
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	)
}

export default HeaderDash
