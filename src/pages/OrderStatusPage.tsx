import { useGetMyOrders } from "@/api/OrderAPI"
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return "Loading";
  }

  if (!orders || orders?.length === 0) {
    return "No orders found!";
  }

  return (
    <div className="space-y-10">
      {orders?.map((order) => (
        <div className="space-y-10 bg-gray-100 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage