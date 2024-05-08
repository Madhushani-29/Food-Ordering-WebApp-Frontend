import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
    const { id } = useParams();

    return (
        <div>RestaurantDetailsPage: {id}</div>
    )
}

export default RestaurantDetailsPage;