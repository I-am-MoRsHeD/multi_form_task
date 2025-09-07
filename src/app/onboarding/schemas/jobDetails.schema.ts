import { Departments, JobType } from "@/types";
import { isWithinDays } from "@/utils/date";
import z from "zod";

export const jobDetailsZodSchema = z.discriminatedUnion("jobType", [
    z.object({
        jobType: z.literal(JobType["FullTime"]),
        department: z.enum(Object.values(Departments) as [string]),
        positionTitle: z.string().min(3, "Position title must be at least 3 characters"),
        startDate: z
            .date()
            .refine((val) => isWithinDays(val, 90), "Start date cannot be more than 90 days ahead"),
        manager: z.string().nonempty("Manager is required"),
        managerApproved: z.boolean().optional(),
        salary: z.number().min(30000).max(200000),
    }),
    z.object({
        jobType: z.literal(JobType["PartTime"]),
        department: z.enum(Object.values(Departments) as [string]),
        positionTitle: z.string().min(3, "Position title must be at least 3 characters"),
        startDate: z
            .date()
            .refine((val) => isWithinDays(val, 90), "Start date cannot be more than 90 days ahead"),
        manager: z.string().nonempty("Manager is required"),
        managerApproved: z.boolean().optional(),
        salary: z.number().min(5000).max(60000),
    }),
    z.object({
        jobType: z.literal(JobType.Contract),
        department: z.enum(Object.values(Departments) as [string]),
        positionTitle: z.string().min(3, "Position title must be at least 3 characters"),
        startDate: z
            .date()
            .refine((val) => isWithinDays(val, 90), "Start date cannot be more than 90 days ahead"),
        manager: z.string().nonempty("Manager is required"),
        managerApproved: z.boolean().optional(),
        salary: z.number().min(50).max(150),
    }),
]);

export type JobDetailsSchema = z.infer<typeof jobDetailsZodSchema>;