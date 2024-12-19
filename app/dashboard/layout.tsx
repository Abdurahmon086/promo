import { AppSidebar } from '@/components/shared/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className=''>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
