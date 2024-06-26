import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant!");
        }
        return response.json();
    };

    const {
        data: currentRestaurant,
        isLoading,
    } = useQuery("fetchCurrentRestaurant", getMyRestaurantRequest);

    return {
        currentRestaurant,
        isLoading,
    };
};

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
            throw new Error("Failed to create restaurant!");
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
        toast.error("Failed to create restaurant!");
    }

    return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurantRequest = async (formData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to update restaurant!");
        }

        return response.json();
    };

    const {
        mutateAsync: updateRestaurant,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated!");
    }

    if (error) {
        toast.error("Unable to update restaurant");
        reset();
    }

    return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get orders!");
        }
        return response.json();
    };

    const {
        data: restaurantOrders,
        isLoading,
    } = useQuery("fetchCurrentRestaurantOrders", getMyRestaurantOrdersRequest);

    return {
        restaurantOrders,
        isLoading,
    };
};

export type UpdateStateRequestType = {
    orderID: string,
    status: string;
}

export const useUpdateMyRestaurantOrderStatus = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateOrderStatusRequest = async (updateStatusRequest: UpdateStateRequestType): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusRequest.orderID}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: updateStatusRequest.status }),
        });

        if (!response.ok) {
            throw new Error("Failed to update status!");
        }

        return response.json();
    };

    const {
        mutateAsync: updateStatus,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateOrderStatusRequest);

    if (isSuccess) {
        toast.success("Status updated!");
    }

    if (error) {
        toast.error("Unable to update status");
        reset();
    }

    return { updateStatus, isLoading };
};
