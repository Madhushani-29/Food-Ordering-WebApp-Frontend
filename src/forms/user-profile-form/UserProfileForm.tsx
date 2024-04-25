import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//properties that the form have
const formSchema = z.object({
    //email optional since it is a read only field
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
});

//UserFormData becomes a TypeScript type that represents the structure of the data 
//that matches the schema defined by formSchema
type UserFormData = z.infer<typeof formSchema>;

type Props = {
    //onSave is a property representing a function with return type void
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
}

const UserProfileForm = ({ onSave, isLoading }: Props) => {
    // line initializes a form using the useForm hook
    //specifies the generic type UserFormData, which likely represents the shape of the form data
    const form = useForm<UserFormData>({
        //configures the form's resolver. The resolver is responsible for validating the form data
        //zodResolver is used, indicating that Zod schema validation will be used. 
        //formSchema is the validation rules for the form.
        resolver: zodResolver(formSchema)
    });

    return (
        <div>UserProfileForm</div>
    )
}

export default UserProfileForm