/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { skillsByDepartment } from '../data/skillsByDepartment';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ISkillFields {
    id: string;
    value: string;
    skill: string;
};

const SkillsForm = () => {
    const { control } = useFormContext();
    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control: control,
        name: "skill",
    });

    return (
        <div className='space-y-8'>
            <div className='flex flex-row gap-5'>
                <FormField
                    control={control}
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
                                    control={control}
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
                                                                const index = skillFields.findIndex((f: any) => f.skill === item);
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
                        skillFields.map((item : ISkillFields, index : number) => (
                            <div className="flex flex-col gap-2" key={item.id}>
                                <FormLabel className="text-base">{item?.skill}</FormLabel>
                                <FormField
                                    control={control}
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
                    control={control}
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
                    control={control}
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
        </div>
    );
};

export default SkillsForm;