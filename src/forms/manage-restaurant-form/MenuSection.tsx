import { FormDescription } from "@/components/ui/form";
import { useFormContext } from "react-hook-form"

const MenuSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription className="mb-2">
                    Create your menu and give each item a name and price
                </FormDescription>
            </div>

        </div>
    )
}

export default MenuSection