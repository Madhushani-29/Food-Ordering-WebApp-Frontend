import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
    const { control } = useFormContext();
    //useFieldArray Hook use to manage an array of form fields. 
    //It returns an object with three properties and two arguments
    //fields: An array containing all the form field values in the specified field array
    //append: A function that allows you to append new items to the end of the field array. 
    //When called, it adds a new empty item to the fields array.
    // A function that allows you to remove items from the field array. 
    //When called with an index, it removes the item at that index from the fields array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription className="mb-2">
                    Create your menu and give each item a name and price
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItems"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((_, index) => (
                            <MenuItemInput
                                index={index}
                                //This function call removes the item at the specified index from the fields array 
                                removeMenuItem={() => remove(index)}
                            />
                        ))}
                    </FormItem>
                )}
            />
            <Button type="button" onClick={() => append({ name: "", price: "" })}>
                Add Menu Item
            </Button>

        </div>
    )
}

export default MenuSection