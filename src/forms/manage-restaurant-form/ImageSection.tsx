import { FormControl, FormDescription, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form"
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageSection = () => {
    //allows you to watch the value of one or more fields in the form. 
    //When you pass the name of a field to watch, it returns the current value of that field. 
    //If the field's value changes, the component using watch will re-render automatically
    const { control, watch } = useFormContext();
    const existingImageUrl = watch("imageUrl");

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription className="mb-2">
                    Add an image that will be displayed on your restaurant listing in the search results. Adding new image will overwrite the existing one
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                        />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-white"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) =>
                                        field.onChange(
                                            //event.target.files represents an array-like object containing the selected files
                                            event.target.files ? event.target.files[0] : null
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default ImageSection