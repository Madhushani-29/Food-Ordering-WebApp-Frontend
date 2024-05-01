import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                //there the content type is "Content-Type:"multipart/form-data" since it send form data
                //When use FormData to construct the request body, the fetch API automatically sets the appropriate Content-Type header to multipart/form-data
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        
        return response.json();
    };

    const {
        mutate: createRestaurant,
        isLoading,
        error,
        isSuccess,
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { createRestaurant, isLoading };
};
