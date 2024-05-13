import { useGetRestaurantById } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItemCard from "@/components/MenuItemCard";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import { MenuItem } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderAPI";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const RestaurantDetailsPage = () => {
    const { id } = useParams();
    const { isLoading, restaurant } = useGetRestaurantById(id);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // `cartItems-${restaurantId}` key for storing and retrieving cart items from the session storage
        // their store the cart details for each restaurant separately
        const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            //menuItem being added to the cart already exists in the cartItems array by comparing their _id properties
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            sessionStorage.setItem(
                `cartItems-${id}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            sessionStorage.setItem(
                `cartItems-${id}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return;
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string,
            },
        };

        //await used since need to wait until return the url
        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;
    };

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
                            addToCart={addToCart}
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default RestaurantDetailsPage;