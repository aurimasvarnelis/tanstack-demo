import {useQuery} from '@tanstack/react-query'
import {Link, useParams} from '@tanstack/react-router'

type User = {
    id: string
    name: string
    email: string
    phone: string
    country: string
}

// Fetch all users once (same as Users.tsx)
async function fetchUsers(): Promise<User[]> {
    const res = await fetch('https://randomuser.me/api/?results=100')
    const data = await res.json()
    return data.results.map((u: any) => ({
        id: u.login.uuid,
        name: `${u.name.first} ${u.name.last}`,
        email: u.email,
        phone: u.phone,
        country: u.country,
    }))
}

export default function UserDetail() {
    const {userId} = useParams({from: '/user/$userId'})

    // Try to get cached users first
    const {data: users} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    })

    if (!users) return <p>Loading user...</p>

    const user = users.find(u => u.id === userId)
    if (!user) return <p>User not found</p>

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
            <p>
                <Link to="/">← Back to Users</Link>
            </p>
        </div>
    )
}
