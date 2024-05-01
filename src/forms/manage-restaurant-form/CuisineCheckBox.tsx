import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisine: string,
    field: ControllerRenderProps<FieldValues, "cuisines">;
}
const CuisineCheckBox = ({ cuisine, field }: Props) => {
    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox
                    className="bg-white"
                    //checked determines whether the checkbox is checked or not. 
                    //It checks if the cuisine is included in the field.
                    //value means which represents the array of selected cuisines.
                    checked={field.value.includes(cuisine)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            //If the checkbox is checked, it adds the cuisine to the array of selected cuisines 
                            field.onChange([...field.value, cuisine]);
                        } else {
                            //If it's unchecked, it removes the cuisine from the array of selected cuisines
                            field.onChange(
                                field.value.filter((value: string) => value !== cuisine)
                            );
                        }
                    }}
                />
            </FormControl>
            <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
        </FormItem>
    )
}

export default CuisineCheckBox