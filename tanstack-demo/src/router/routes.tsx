import {
    Router,
    RootRoute,
    Route,
} from '@tanstack/react-router'
import Users from '../pages/Users'
import UserDetail from '../pages/UserDetail'
import { Outlet } from '@tanstack/react-router'


// Root route
const rootRoute = new RootRoute({
    component: () => <div><Outlet /></div>, // layout wrapper
})

// Child routes
const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Users,
})

const userRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/user/$userId',
    component: UserDetail,
})

// Build route tree
const routeTree = rootRoute.addChildren([indexRoute, userRoute])

// Create router
export const router = new Router({ routeTree })
