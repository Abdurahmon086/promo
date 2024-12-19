'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
	const [mount, setMount] = useState(false)
	const { setTheme, resolvedTheme } = useTheme()

	useEffect(() => setMount(true), [])

	return mount && resolvedTheme === 'dark' ? (
		<Button size={'icon'} onClick={() => setTheme('light')} aria-label='mode-toggle-to-light'>
			<Sun />
		</Button>
	) : (
		<Button size={'icon'} onClick={() => setTheme('dark')} aria-label='mode-toggle-to-dark'>
			<Moon />
		</Button>
	)
}
