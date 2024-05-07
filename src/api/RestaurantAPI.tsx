import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//there get parameters in the method out of the hook since
//the city parameter need to use outside of the hook also 
export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurants!");
        }

        return response.json();
    };

    const {
        data: results, isLoading } = useQuery(
            //when React Query manages the cache, it associates this identifier with the data fetched by the createSearchRequest function. 
            //in other ways, if there are not no of params then cat fetch data once and can use as "searchRestaurants" with out []
            //If the parameters or dependencies within this array change, React Query knows to invalidate the cache and fetch fresh data
            //array allows for more flexibility, especially when you have multiple parameters or dependencies that affect the data fetching process
            //searchState is a dynamic object representing the current state of the search
            ["searchRestaurants", searchState],
            createSearchRequest,
            //call createSearchRequest when only city is not null
            { enabled: !!city }
        );

    return {
        results,
        isLoading,
    };
};