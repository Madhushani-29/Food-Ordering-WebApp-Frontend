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
import ImageSection from "./ImageSection";
import { Restaurant } from "@/types";
import { useEffect } from "react";

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
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
})
    //image url or selected image one of them file is required
    .refine((data) => data.imageUrl || data.imageFile, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],
    });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    buttonText?: string;
    currentRestaurant?: Restaurant;
}

const ManageRestaurantForm = ({ onSave, isLoading, currentRestaurant }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });

    useEffect(() => {
        if (!currentRestaurant) {
            return;
        }

        // price lowest domination of 100 = 100pence == 1GBP
        const deliveryPriceFormatted = parseInt(
            (currentRestaurant.deliveryPrice / 100).toFixed(2)
        );

        const menuItemsFormatted = currentRestaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        const updatedRestaurant = {
            ...currentRestaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        };

        form.reset(updatedRestaurant);
    }, [form, currentRestaurant]);

    const onSubmit = (formDataJson: RestaurantFormData) => {
        //convert form data-json to form data object
        //there sending multipart/form-data to BE
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        //when saving currency data need to convert the to lowest currency unit
        //1GBP=100pence
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });
        //only when a image file is available: when update image can not be change some times
        //those times no need to get image
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }
        onSave(formData);
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
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm