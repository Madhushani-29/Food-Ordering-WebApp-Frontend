import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

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
export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    //onSave is a property representing a function with return type void
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
    currentUser?: User;
}

const UserProfileForm = ({ onSave, isLoading, currentUser, title = "User Profile", buttonText = "Submit", }: Props) => {
    // line initializes a form using the useForm hook
    //specifies the generic type UserFormData, which likely represents the shape of the form data
    const form = useForm<UserFormData>({
        //configures the form's resolver. The resolver is responsible for validating the form data
        //zodResolver is used, indicating that Zod schema validation will be used. 
        //formSchema is the validation rules for the form.
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    });

    //when the current user state changes the foem need to re render
    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form]);

    return (
        //...form spreads all the properties and methods of the form object onto the Form component as individual props
        <Form {...form}>
            {/*handle submit validate the form before onsave*/}
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField
                    //control manage form state and validate 
                    control={form.control}
                    //use to identify the field in the form data structure
                    name="email"
                    //render method return a JSX
                    //argument fields contains the props and methods provided by form library
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    );
}

export default UserProfileForm