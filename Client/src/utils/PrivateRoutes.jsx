import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

export default function PrivateRoutes({ children, requiredRole }) {
  const { user, hasHydrated, isAuthLoading } = useAuthStore();

  if (!hasHydrated) {
    return <div>Checking auth...</div>; // Optional spinner
  }

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
