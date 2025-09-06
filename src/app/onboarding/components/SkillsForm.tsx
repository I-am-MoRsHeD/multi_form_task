import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFieldArray, useForm } from 'react-hook-form';
import { skillsByDepartment } from '../data/skillsByDepartment';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type FormValues = {
    skills: string[];
    skill: { value: string; skill: string }[];
    working_hours: string;
    extra_notes: string;
};

const SkillsForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            skills: [],
            skill: [],
            working_hours: "",
            extra_notes: "",
        }
    });

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control: form.control,
        name: "skill",
    });

    const onSubmit = (data) => {

    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="skills"
                            render={() => (
                                <FormItem className='w-1/4'>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Primary Skills</FormLabel>
                                        <FormDescription>
                                            Choose at least 3
                                        </FormDescription>
                                    </div>
                                    {skillsByDepartment.Engineering.map((item, idx) => (
                                        <FormField
                                            key={idx}
                                            control={form.control}
                                            name="skills"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={idx}
                                                        className="flex flex-row items-center gap-2"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    const current = field.value ?? [];
                                                                    if (checked) {
                                                                        field.onChange([...current, item]);
                                                                        appendSkill({ value: "", skill: item });
                                                                    } else {
                                                                        field.onChange(current.filter((value: string) => value !== item));
                                                                        const index = skillFields.findIndex((f) => f.skill === item);
                                                                        if (index !== -1) removeSkill(index);
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex-1'>
                            <FormLabel className="text-base">Experience Per Skill</FormLabel>
                            {skillFields.length < 1 ? <div>
                                <h1>Please select your skill first</h1>
                            </div> :
                                skillFields.map((item, index) => (
                                    <div className="flex flex-col gap-2" key={item.id}>
                                        <FormLabel className="text-base">{item?.skill}</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name={`skill.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="working_hours"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Preferred Working Hours(start - end)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10AM - 6PM" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display working hours
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex-1 flex flex-col justify-between gap-6'>
                            <FormLabel>Remote preference</FormLabel>
                            <Slider
                                defaultValue={[50]}
                                max={100}
                                step={1}
                                className='flex-1'
                            />
                        </div>
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name="extra_notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Extra notes (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell something extra if you want"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className='sr-only'>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SkillsForm;