import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input";

const relationsData = [
    "Mother", "Father", "Brother", "Sister", "Uncle", "Wife", "Husband"
]

const EmergencyContactForm = () => {
    const { control } = useFormContext();

    return (
        <div className='space-y-8'>
            <>
                {/* contact name */}
                <FormField
                    control={control}
                    name="contact_name"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon Doe" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public contact name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </>
            <div className='flex flex-row gap-5 w-full'>
                {/* phone */}
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+8801*********" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public phone number
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* relationship */}
                <FormField
                    control={control}
                    name="relationship"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Relationship</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a relationship from below" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        relationsData.map((data) => (
                                            <SelectItem key={data} value={data}>{data}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormDescription className='sr-only'>
                                You can manage email addresses in your
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-row gap-5 w-full'>
                {/* guardian name */}
                <FormField
                    control={control}
                    name="guardian_name"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Guardian Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon Doe" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public contact name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* guardian_phone */}
                <FormField
                    control={control}
                    name="guardian_phone"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Guardian Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+8801*********" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public phone number
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default EmergencyContactForm;