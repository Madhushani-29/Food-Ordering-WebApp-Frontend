import { useCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        //useref use to stop rerender when state change and
        //hasCreatedUser use to make sure only once call the create function
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0ID: user.sub, email: user.email });
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [createUser, navigate, user]);

    return (
        <>Loading...</>
    )
}

export default AuthCallbackPage