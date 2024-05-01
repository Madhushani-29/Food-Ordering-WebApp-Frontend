import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";

const formSchema = z.object({
    restaurantName: z.string({ required_error: "Restaurant name is required" }),
    city: z.string({ required_error: "City name is required" }),
    country: z.string({ required_error: "Country name is required" }),
    //normally html inputs are strings, there convert string to number
    //check weather it is a number or not
    deliveryPrice: z.coerce.number({
        required_error: "Delivery Price is required",
        invalid_type_error: "Must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated Delivery Time is required",
        invalid_type_error: "Must be a valid number"
    }),
    //check each item seperately to identify all are not selected
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least ine item"
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "Menu item name is required"),
            price: z.coerce.number().min(1, "Menu item price is required"),
        })
    ),
    imageFile: z.instanceof(File, { message: "Image is required" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: RestaurantFormData) => void;
    isLoading: boolean;
    buttonText?: string;
    //currentUser?: User;
}

const ManageRestaurantForm = ({ /*onSave,*/ isLoading, buttonText = "Submit", }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });

    const onSubmit = (/*formDataJson: RestaurantFormData*/) => {
        //convert form data json to form data object

    }

    return (
        //behind the scene the form component uses app context to pass all form properties to its child components
        //thats why details section and others can use form context
        //so form component and its children works together
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
                <Separator />
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm