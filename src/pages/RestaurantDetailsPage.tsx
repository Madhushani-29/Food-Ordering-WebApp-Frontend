import { useGetRestaurantById } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItemCard from "@/components/MenuItemCard";
import { useState } from "react";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const RestaurantDetailsPage = () => {
    const { id } = useParams();
    const { isLoading, restaurant } = useGetRestaurantById(id);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // `cartItems-${restaurantId}` key for storing and retrieving cart items from the session storage
        // their store the cart details for each restaurant separately
        const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

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
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItemCard
                            menuItem={menuItem}
                        />
                    ))}
                </div>
                <div>
                    Cart
                </div>
            </div>

        </div>
    )
}

export default RestaurantDetailsPage;