import { z } from "zod";
import { personalInfoZodSchema } from "./personalInfo.schema";
import { jobDetailsZodSchema } from "./jobDetails.schema";
import { skillsZodSchema } from "./skills.schema";
import { emergencyZodSchema } from "./emergency.schema";

export const onboardingSchema = z.object({
  personalInfo: personalInfoZodSchema,
  jobDetails: jobDetailsZodSchema,
  skills: skillsZodSchema,
  emergency: emergencyZodSchema,
  confirmation: z.boolean().refine((val) => val === true, {
    message: "You must confirm all information is correct",
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
