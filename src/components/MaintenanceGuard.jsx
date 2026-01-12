import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const MaintenanceGuard = () => {
    const location = useLocation();
    const isMaintenanceMode = localStorage.getItem('maintenanceMode') === 'true';
    const userRole = localStorage.getItem('role'); // e.g., 'admin', 'user', 'partner', 'owner'

    // Routes that are ALWAYS accessible
    // 'owner-dashboard' access is handled by ProtectedRoute + role check, 
    // but here we just need to ensure we don't *block* it if they are logged in as admin.
    const whitelist = ['/login', '/maintenance', '/signup', '/forgot-password'];

    // If attempting to access a whitelisted page, allow it.
    if (whitelist.includes(location.pathname)) {
        return <Outlet />;
    }

    // If maintenance is ON:
    if (isMaintenanceMode) {
        // If user is Admin (or Owner - treating them same for this app based on App.jsx), ALLOW.
        if (userRole === 'admin' || userRole === 'owner') {
            return <Outlet />;
        }

        // Otherwise, redirect to maintenance page.
        // Prevent infinite redirect loop if already on /maintenance (covered by whitelist above, but good specific check)
        if (location.pathname !== '/maintenance') {
            return <Navigate to="/maintenance" replace />;
        }
    }

    // If maintenance OFF, or user is allowed, render children
    return <Outlet />;
};

export default MaintenanceGuard;
