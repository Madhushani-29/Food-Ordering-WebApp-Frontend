import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const save = () => {
    console.log("Hi");
  }
  return (
    <ManageRestaurantForm onSave={save} isLoading={false} />
  )
}

export default ManageRestaurantPage;