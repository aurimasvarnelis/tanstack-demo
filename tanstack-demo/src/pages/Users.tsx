import { useQuery } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'
import { Table } from '../components/Table'
import { Link } from '@tanstack/react-router'

type User = {
    id: number
    name: string
    email: string
}

async function fetchUsers(): Promise<User[]> {
    return fetch('https://jsonplaceholder.typicode.com/users').then(res =>
        res.json()
    )
}

export default function Users() {
    const { data = [], isLoading, error } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }: any) => (
                <Link
                    to="/user/$userId"
                    params={{ userId: row.original.id.toString() }}
                >
                    {row.original.name}
                </Link>
            ),
        },
        { accessorKey: 'email', header: 'Email' },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) return <p>Loading users...</p>
    if (error instanceof Error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>Users</h1>
            <Table table={table} />
        </div>
    )
}
