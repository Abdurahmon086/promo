import { loginCheck } from '@/actions/auth.action'
import { AppSidebar } from '@/components/shared/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ChildProps } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: ChildProps) {
	const cookieStore = await cookies()
	const token = cookieStore.get('buyer_token')?.value
	if (token) {
		console.log(token)
		const res = await loginCheck(token)

		if (!res) {
			redirect('/sign-in')
		}
	} else {
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
