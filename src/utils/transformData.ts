// src/app/onboarding/utils/transforms.ts

import { OnboardingSchema } from "@/app/onboarding/schemas";

/**
 * Transform form data into final API-ready format
 */
export function transformFormData(formData: OnboardingSchema) {
    const { personalInfo, jobDetails, skills, emergency, confirmation } = formData;

    return {
        fullName: personalInfo.fullName.trim(),
        email: personalInfo.email,
        phone: personalInfo.phoneNumber,
        dob: personalInfo.dob.toISOString().split("T")[0],
        profilePicture: personalInfo.profilePicture || null,

        department: jobDetails.department,
        positionTitle: jobDetails.positionTitle,
        startDate: jobDetails.startDate.toISOString().split("T")[0],
        jobType: jobDetails.jobType,
        salary:
            jobDetails.jobType === "Contract"
                ? `${jobDetails.salary}/hour`
                : jobDetails.salary,
        manager: jobDetails.manager,
        managerApproved: jobDetails.managerApproved || false,

        skills: skills.experience.map((skill) => ({
            name: skill.skill,
            exp: skill.value
        })),
        preferredHours: skills.preferredHours,
        remotePreference: skills.remotePreference,
        extraNotes: skills.extraNotes || "",

        emergencyContact: {
            name: emergency.contactName,
            relationship: emergency.relationship,
            phone: emergency.phone,
            guardian: emergency.guardian || null,
        },

        confirmed: confirmation,
    };
}
