import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import ProfilePicture from '@/components/ui/ProfilePicture';
import { useState } from 'react';
import { FileMetadata } from '@/hooks/use-file-upload';
import { useFormContext } from "react-hook-form";

const PersonalInfoForm = () => {
    const { control } = useFormContext();
    const [image, setImage] = useState<(File | FileMetadata) | null>(null);


    return (
        <div className="space-y-8">
            <div className='flex flex-row gap-5 w-full'>
                {/* name */}
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon Doe" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public display name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* email */}
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jhon.doe@gmail.com" type={"email"} {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public display email
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
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
                {/* dob */}
                <FormField
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription className="sr-only">
                                Your date of birth is used to calculate your age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <ProfilePicture setImage={setImage} />
            </div>
        </div>
    );
};

export default PersonalInfoForm;