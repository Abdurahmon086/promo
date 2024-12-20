import { AppSidebar } from '@/components/shared/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ChildProps } from '@/types'

export default function DashboardLayout({ children }: ChildProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
