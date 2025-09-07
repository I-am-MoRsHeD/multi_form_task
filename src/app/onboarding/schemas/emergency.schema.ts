import { z } from "zod";

export const emergencyZodSchema = z.object({
    contactName: z.string().min(1, "Contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    phone: z
        .string()
        .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
            message: "Phone must be in format +1-123-456-7890",
        }),
    guardian: z
        .object({
            name: z.string().min(1),
            phone: z
                .string()
                .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/),
        })
        .optional(),
});

export type EmergencySchema = z.infer<typeof emergencyZodSchema>;
