import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button"

const MainNav = () => {
    //use the useAuth0 hook in your component to access authentication-related functionality. 
    //For example, you can use it to get the user's authentication status, user profile, login/logout functions
    //loginWithRedirect redirect user to login/register pages
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}>
            Log In
        </Button>
    )
}

export default MainNav;