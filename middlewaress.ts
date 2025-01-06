// const publicRoutes = ['/sign-in', '/sign-up', '/']

// export default async function middleware(req: NextRequest) {
// 	const path = req.nextUrl.pathname
// 	const isProtectedRoute = path.split('/').includes('dashboard')
// 	console.log(path, isProtectedRoute)
// 	const isPublicRoute = publicRoutes.includes(path)

// 	const cookie = (await cookies()).get('buyer_token')?.value || ''
// 	const session = await checkLog(cookie)

// 	if (isProtectedRoute && !session) {
// 		return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
// 	}

// 	if (isPublicRoute && session && !req.nextUrl.pathname.startsWith('/dashboard')) {
// 		return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
// 	}

// 	return NextResponse.next()
// }

// export const config = {
// 	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }
