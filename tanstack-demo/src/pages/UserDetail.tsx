import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from '@tanstack/react-router'

type User = {
    id: number
    name: string
    email: string
    phone: string
    website: string
}

async function fetchUser(id: string): Promise<User> {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res =>
        res.json()
    )
}

export default function UserDetail() {
    const { userId } = useParams({ from: '/user/$userId' })

    const { data, isLoading, error } = useQuery<User>({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
    })

    if (isLoading) return <p>Loading user...</p>
    if (error instanceof Error) return <p>Error: {error.message}</p>

    if (!data) return <p>No user found</p>

    return (
        <div>
            <h1>{data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Website: {data.website}</p>
            <p>
                <Link to="/">← Back to Users</Link>
            </p>
        </div>
    )
}
