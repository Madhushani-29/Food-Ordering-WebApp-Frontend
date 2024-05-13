import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantAPI";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
  const { restaurantOrders, isLoading: isGetOrdersLoading } = useGetMyRestaurantOrders();

  // '!!' operator is a double negation, which coerces a value to its boolean equivalent
  // When currentRestaurant is falsy (null, undefined, 0, false, or an empty string), 
  // '!!'currentRestaurant will result in false
  const isEditing = !!currentRestaurant;

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">
          Orders
        </TabsTrigger>
        <TabsTrigger value="manage-restaurant">
          Manage Restaurant
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{restaurantOrders?.length} active orders</h2>
        {restaurantOrders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          currentRestaurant={currentRestaurant}
        />
      </TabsContent>
    </Tabs>
  )
}

export default ManageRestaurantPage;