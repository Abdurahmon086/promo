'use client'

import { deletePromo, updateActivePromo } from '@/actions/promo.action'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IPromo } from '@/types'
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import DashPromoModal from '../modals/dash-promo.modal'

function PromosTable({ promos }: { promos: IPromo[] }) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	const path = usePathname()

	const isActive = (id: string, active: boolean) => {
		if (!id) return

		const promise = updateActivePromo(id, (active = !active), path)
		toast.promise(promise, {
			loading: 'Updating promo...',
			success: 'Promo active updated successfully',
			error: 'Failed to active update promo',
		})
	}

	const deletePromoById = (id: string) => {
		if (!id) return

		const promise = deletePromo(id, path)
		toast.promise(promise, {
			loading: 'Deleting promo...',
			success: 'Promo deleted successfully',
			error: 'Failed to delete promo',
		})
	}

	const columns: ColumnDef<IPromo>[] = [
		{
			accessorKey: 'active',
			header: 'Actives',
			cell: ({ row }) => <div className='capitalize'>{row.getValue('active') ? 'Active' : 'No Active'}</div>,
		},
		{
			accessorKey: 'title_uz',
			header: ({ column }) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Titles
						<ArrowUpDown />
					</Button>
				)
			},
			cell: ({ row }) => <div className='lowercase'>{row.getValue('title_uz')}</div>,
		},
		{
			accessorKey: 'description_uz',
			header: 'Descriptiones',
			cell: ({ row }) => <div className='lowercase line-clamp-1'>{row.getValue('description_uz')}</div>,
		},
		{
			accessorKey: 'price',
			header: () => <div className='text-right'>Amount</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue('price'))

				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(amount)

				return <div className='text-right font-medium'>{formatted}</div>
			},
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => row.original._id && isActive(row.original._id, row.original.active)}>
								{!row.original.active ? 'Active' : 'No Active'}
							</DropdownMenuItem>
							<DropdownMenuItem asChild>{row.original._id && <DashPromoModal id={row.original._id} />}</DropdownMenuItem>
							<DropdownMenuItem onClick={() => row.original._id && deletePromoById(row.original._id)}>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: promos,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter title...'
					value={(table.getColumn('title_uz')?.getFilterValue() as string) ?? ''}
					onChange={event => table.getColumn('title_uz')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='space-x-2'>
					<Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

export default PromosTable
