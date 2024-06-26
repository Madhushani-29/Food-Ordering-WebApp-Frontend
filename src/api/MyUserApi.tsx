import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    // Promise<User> : function takes no arguments and returns a promise that resolves to a value of type User
    //user type use to restrict in component only ro accept user type data
    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user!");
        }

        return response.json();
    };

    //uses the useQuery hook because it's primarily concerned with data fetching and does not involve modifying the data on the server
    //usequery first argument is a unique key for identifying the query
    //second argument is the function responsible for fetching the data.
    const {
        //data holds the fetched data from API endpoints defined by useQuery
        data: currentUser,
        isLoading,
        error
    //first argument passed to useQuery is a unique key, often used to identify the query ( cache key)
    //second argument is typically a function that defines how to fetch the data
    } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return {
        currentUser,
        isLoading,
    };
};

//type include all the properties need to send in the request body
type CreateUserRequest = {
    auth0ID: string;
    email: string
}

//exports a custom React hook named useCreateMyUser
//Custom hooks in React typically start with the prefix "use"
export const useCreateMyUser = () => {
    // uses the useAuth0 hook to get the getAccessTokenSilently function. 
    //This function is likely used to retrieve an access token from Auth0 silently
    const { getAccessTokenSilently } = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        //parameters for fetch are
        //url to send the data
        //set of options need to send the req data
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                //says the BE server what type use to send data in request
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user!");
        }
    };

    //uses the useMutation hook because it involves modifying data on the server 
    //uses the useMutation hook to create a mutation function named createUser, 
    //which will call the createMyUserRequest function
    //mutateAsync is used to trigger mutation operations defined by useMutation
    const {
        mutateAsync: createUser,
        isLoading,
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
    };
};

type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update user!");
        }

        return response.json();
    };

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        // resets the state of the mutation to its initial state, 
        // clearing any temporary data like isLoading, isSuccess, and error
        reset,
    } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User profile updated!");
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isLoading };
};