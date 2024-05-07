import { useSearchRestaurants } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading){
    return <span>
      Loading...
    </span>
  }
  return (
    <div>
      {results?.data.map((restaurant) =>
        <div>found - {restaurant.restaurantName} {restaurant.city}</div>
      )}
    </div>
  );
};

export default SearchPage;