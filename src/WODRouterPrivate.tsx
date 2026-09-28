import { Navigate } from 'react-router-dom';

interface WODRouterPrivateProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

export function WODRouterPrivate({ children, isAuthenticated }: WODRouterPrivateProps) {
    return isAuthenticated ? children : <Navigate to="/auth" replace />;
}