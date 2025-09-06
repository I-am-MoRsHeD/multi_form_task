import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { mockManagers } from '../data/mockManagers';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SearchableDropdown from '@/components/ui/SearchableDropdown';
import { IManagerInfo } from '@/types';

const JobDetailsForm = () => {
    const { control } = useFormContext();
    const [departments, setDepartments] = useState<string[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>();
    const [managerByDepartment, setManagerByDepartment] = useState<IManagerInfo[]>([]);

    useEffect(() => {
        const departments = [
            ... new Set(mockManagers.map(data => data.department))
        ];
        setDepartments(departments);
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            const filteredManagers = mockManagers.filter(data => data.department === selectedDepartment)
            setManagerByDepartment(filteredManagers);
        };
    }, [selectedDepartment])

    return (
        <div className='h-screen space-y-8'>
            <div className='flex flex-row gap-5 w-full'>
                <FormField
                    control={control}
                    name="department"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedDepartment(value)
                            }} defaultValue={field.value}>
                                <FormControl className='w-full'>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a department from below" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Position Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Full Stack Developer" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public display position title
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-row gap-5 w-full'>
                {/* start date */}
                <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="flex-1 flex flex-col">
                            <FormLabel>Start Date</FormLabel>
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
                                            date > new Date(new Date().setDate(new Date().getDate() - 1))
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription className="sr-only">
                                Your start date is used to calculate for job.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Job types */}
                <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3 flex-1">
                            <FormLabel>Job Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row"
                                >
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="full_time" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Full Time
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="part_time" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Part Time
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="contract" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Contract
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-row gap-5 w-full'>
                <FormField
                    control={control}
                    name="expected_salary"
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel>Expected Salary</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is your public display salary expectation
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex-1'>
                    <SearchableDropdown filteredManagers={managerByDepartment} />
                </div>
            </div>
        </div >
    );
};

export default JobDetailsForm;