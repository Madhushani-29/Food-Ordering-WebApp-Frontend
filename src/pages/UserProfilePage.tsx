import { useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateMyUser();
  return (
    <>
      { /*form data structure and update user */}
      <UserProfileForm isLoading={isLoading} onSave={updateUser} />
    </>
  )
}

export default UserProfilePage