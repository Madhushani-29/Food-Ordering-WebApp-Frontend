import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

export type Props = {
    disabled: boolean;
}

const CheckoutButton = ({ disabled }: Props) => {
    //current path use to redirect after login
    const { pathname } = useLocation();

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        });
    };

    if (!isAuthenticated) {
        return <Button className="bg-orange-500 flex-1" onClick={onLogin}>Log in to Checkout</Button>
    }

    if (isAuthLoading) {
        return <LoadingButton />
    }

    return (
        <Button className="bg-orange-500 flex-1" disabled={disabled}>Go to Checkout</Button>
    )
}

export default CheckoutButton;