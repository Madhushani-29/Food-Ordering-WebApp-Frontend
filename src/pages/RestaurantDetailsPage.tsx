import { useGetRestaurantById } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
    const { id } = useParams();
    const { isLoading, restaurant } = useGetRestaurantById(id);

    if (isLoading) {
        <span>Loading ...</span>;
    }

    if (!restaurant || !id) {
        return <span>No results found</span>;
    }

    return (
        <div>RestaurantDetailsPage: {id}
            <div>{restaurant.restaurantName}</div>
        </div>
    )
}

export default RestaurantDetailsPage;