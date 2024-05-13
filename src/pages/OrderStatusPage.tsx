import { useGetMyOrders } from "@/api/OrderAPI"

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    <span>Loading...</span>
  }

  if (!orders) {
    <span>No results found</span>;
  }

  return (
    <div>OrderStatusPage</div>
  )
}

export default OrderStatusPage