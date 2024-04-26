import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  //adding alias to avoid getting confusion identify loading
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    <span>Loading...</span>
  }

  if (!currentUser) {
    <span>Unable to load the user...</span>
  }

  return (
    //form data structure and update user 
    <UserProfileForm currentUser={currentUser} isLoading={isUpdateLoading} onSave={updateUser} />

  )
}

export default UserProfilePage