import { z } from "zod";

export const skillsZodSchema = z.object({
  primarySkills: z.array(z.string()).min(3, "Select at least 3 skills"),
  experience: z.array(
    z.object({
      skill: z.string(),
      value: z.string().min(1, "Experience is required")
    })
  ),
  preferredHours: z.string(),
  remotePreference: z.number().min(0).max(100),
  extraNotes: z.string().max(500).optional(),
  managerApproved: z.boolean().optional(),
});

export type SkillsSchema = z.infer<typeof skillsZodSchema>;
