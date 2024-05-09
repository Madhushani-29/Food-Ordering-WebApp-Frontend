import { CartItem } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types"
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    //removeFromCart: (cartItem: CartItem) => void;
}

const OrderSummary = ({ restaurant, cartItems, /*removeFromCart*/ }: Props) => {
    const getTotalCost = () => {
        //reduce() is a higher-order function used to iterate through an array and accumulate a single result. 
        //It takes a callback function as its argument, which is executed for each element of the array
        const totalInPence = cartItems.reduce(
            //This is returned and becomes the new value of total for the next iteration
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            //reduce() accepts an optional initial value as its second argument. 
            //Here, 0 is provided as the initial value for the total accumulator.
            0
        );

        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

        return (totalWithDelivery / 100).toFixed(2);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>£{getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                            //onClick={() => removeFromCart(item)}
                            />
                            £{((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>£{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary