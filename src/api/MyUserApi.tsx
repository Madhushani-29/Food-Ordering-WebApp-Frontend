import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//type include all the properties need to send in the request body
type CreateUserRequest = {
    auth0Id: string;
    email: string
}

export const useCreateMyUser = () => {
    const createMyUserRequest = async (user: CreateUserRequest) => {
        //parameters for fetch are
        //url to send the data
        //set of options need to send the req data
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                //says the BE server what type use to send data in request
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };
};