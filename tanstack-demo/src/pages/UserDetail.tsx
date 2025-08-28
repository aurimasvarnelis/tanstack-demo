import {useQueryClient} from '@tanstack/react-query'
import {useParams, Link} from '@tanstack/react-router'

type User = {
    id: string
    name: string
    email: string
    picture: string
}

export default function UserDetail() {
    const {userId} = useParams({from: '/user/$userId'})

    const queryClient = useQueryClient()
    const users = queryClient.getQueryData<User[]>(['users'])
    const user = users?.find(u => u.id === userId)

    if (!user) return <p>User not found</p>

    return (
        <div>
            <h1>{user.name}</h1>
            <img
                src={user.picture}
                alt={user.name}
                style={{width: '150px', borderRadius: '50%', marginBottom: '1rem'}}
            />
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
            <p>
                <Link to="/">← Back to Users</Link>
            </p>
        </div>
    )
}
