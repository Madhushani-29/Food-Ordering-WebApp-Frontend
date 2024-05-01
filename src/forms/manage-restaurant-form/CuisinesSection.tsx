import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form"
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription className="mb-2">
                    Create your menu and give each item a name and price
                </FormDescription>
                <FormField
                    control={control}
                    name="cuisines"
                    render={({ field }) => (
                        <FormItem>
                            <div className="grid md:grid-cols-5 gap-5">
                                {cuisineList.map((cuisineItem) => (
                                    <CuisineCheckBox cuisine={cuisineItem} field={field} />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

        </div>
    )
}

export default CuisinesSection