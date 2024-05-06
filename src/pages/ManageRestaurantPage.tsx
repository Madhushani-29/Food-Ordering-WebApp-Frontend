import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  // '!!' operator is a double negation, which coerces a value to its boolean equivalent
  // When currentRestaurant is falsy (null, undefined, 0, false, or an empty string), 
  // '!!'currentRestaurant will result in false
  const isEditing = !!currentRestaurant;

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      currentRestaurant={currentRestaurant} />
  )
}

export default ManageRestaurantPage;