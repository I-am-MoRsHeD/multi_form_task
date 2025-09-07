import { calculateAge } from '@/utils/date';
import { z } from 'zod';

export const personalInfoZodSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .refine((val) => val.trim().split(" ").length >= 2, {
            message: "Please enter at least 2 words",
        }),
    email: z.email("Invalid email address"),
    phoneNumber: z
        .string()
        .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
            message: "Phone must be in format +1-123-456-7890",
        }),
    dob: z
        .date()
        .refine((val) => calculateAge(val) >= 18, {
            message: "Must be at least 18 years old",
        }),
    profilePicture: z
        .any()
        .nullable()
        .optional()
        .refine(
            (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
            "Only JPG/PNG allowed"
        )
        .refine(
            (file) => !file || file.size <= 2 * 1024 * 1024,
            "Max size is 2MB"
        ),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoZodSchema>