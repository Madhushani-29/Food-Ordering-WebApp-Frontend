import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth0();

    //if the user is authenticated, the child routes will be rendered
    //sAuthenticated is false, the component returns a Navigate component with the to prop set to "/" and replace
    return isAuthenticated ?
        <Outlet /> :
        <Navigate to="/" replace />
}

export default ProtectedRoutes;