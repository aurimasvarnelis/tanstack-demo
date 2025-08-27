import {useQuery} from '@tanstack/react-query'
import {
    type ColumnDef,
    type ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {Table} from '../components/Table'
import {Link} from '@tanstack/react-router'
import {useState} from 'react'

type User = {
    id: string
    name: string
    email: string
}

async function fetchUsers(): Promise<User[]> {
    const res = await fetch('https://randomuser.me/api/?results=100')
    const data = await res.json()
    return data.results.map((u: any) => ({
        id: u.login.uuid, // unique id
        name: `${u.name.first} ${u.name.last}`,
        email: u.email,
    }))
}

export default function Users() {
    const {data = [], isLoading, error} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const columns: ColumnDef<User>[] = [
        {accessorKey: 'id', header: 'ID'},
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({row}) => (
                <Link
                    to="/user/$userId"
                    params={{userId: row.original.id}}
                >
                    {row.original.name}
                </Link>
            ),
        },
        {accessorKey: 'email', header: 'Email'},
    ]

    const table = useReactTable({
        data,
        columns,
        state: {sorting, columnFilters},
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (isLoading) return <p>Loading users...</p>
    if (error instanceof Error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Users</h1>

            {/* Filters */}
            <div style={{marginBottom: '1rem'}}>
                <input
                    placeholder="Filter by name"
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={e => table.getColumn('name')?.setFilterValue(e.target.value)}
                    style={{marginRight: '1rem'}}
                />
                <input
                    placeholder="Filter by email"
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={e =>
                        table.getColumn('email')?.setFilterValue(e.target.value)
                    }
                />
            </div>

            {/* Table */}
            <Table table={table}/>

            {/* Pagination */}
            <div style={{marginTop: '1rem'}}>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>
                <span style={{margin: '0 1rem'}}>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
        </span>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
