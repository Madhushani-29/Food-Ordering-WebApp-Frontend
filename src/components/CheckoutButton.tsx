import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

export type Props = {
    disabled: boolean;
    onCheckout: (userFormData: UserFormData) => void;
}

const CheckoutButton = ({ disabled, onCheckout }: Props) => {
    //current path use to redirect after login
    const { pathname } = useLocation();

    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
    const { currentUser } = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            },
        });
    };

    if (!isAuthenticated || !currentUser) {
        return <Button className="bg-orange-500 flex-1" onClick={onLogin}>Log in to Checkout</Button>
    }

    if (isAuthLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={false}
                    title="Confirm Deliery Details"
                    buttonText="Continue to payment"
                />
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton;