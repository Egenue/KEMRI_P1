import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute - Safeguards all child workspace routes.
 * If not authenticated, replaces history state and pushes to /admin login.
 */
function ProtectedRoute() {
  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  // If credentials are valid, render child views via <Outlet />
  // Otherwise, kick them back to login and replace history tracking
  return (token && adminUser) ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default ProtectedRoute;