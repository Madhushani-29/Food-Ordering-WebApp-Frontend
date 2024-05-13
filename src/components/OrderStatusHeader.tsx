import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    //calculate the expected delivery time
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        );

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = () => {
        return (
            //there o is a single element in the order status array
            //check each one of ORDER_STATUS equal to order status it will return the label and progress related to it
            //if no one equal then assume the order only placed (first value in ORDER_STATUS array)
            ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        );
    };


    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order Status: {getOrderStatusInfo().label}</span>
                <span> Expected by: {getExpectedDelivery()}</span>
            </h1>
            <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
        </>
    );
};

export default OrderStatusHeader;