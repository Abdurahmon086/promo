import { loginCheck } from '@/actions/auth.action'
import { AppSidebar } from '@/components/shared/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ChildProps } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: ChildProps) {
	const cookie = await cookies()
	const token = cookie.get('buyer_token')?.value

	if (!token || !(await loginCheck(token))) {
		redirect('/sign-in')
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div>{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
