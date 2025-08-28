import { createRootRoute, createRoute, Router, Outlet } from '@tanstack/react-router';
import Users from '../pages/Users';
import UserDetail from '../pages/UserDetail';

// Create the root route
const rootRoute = createRootRoute({
    component: () => <div><Outlet /></div>, // Layout wrapper
});

// Define child routes
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Users,
});

const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/user/$userId',
    component: UserDetail,
});

// Build the route tree
const routeTree = rootRoute.addChildren([indexRoute, userRoute]);

// Create the router instance
export const router = new Router({ routeTree });
