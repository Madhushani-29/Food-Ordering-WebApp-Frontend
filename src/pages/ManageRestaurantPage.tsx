import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  
  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isCreateLoading}
      currentRestaurant={currentRestaurant} />
  )
}

export default ManageRestaurantPage;