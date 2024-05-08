import { useGetRestaurantById } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "@/components/RestaurantInfo";

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
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    
                </div>
                <div>
                    Cart
                </div>
            </div>

        </div>
    )
}

export default RestaurantDetailsPage;