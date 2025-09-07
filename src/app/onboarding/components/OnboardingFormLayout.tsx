'use client'
import React, { useEffect, useState } from 'react';
import Stepper from './Stepper';
import PersonalInfoForm from './PersonalInfoForm';
import JobDetailsForm from './JobDetailsForm';
import SkillsForm from './SkillsForm';
import EmergencyContactForm from './EmergencyContactForm';
import FormWrapper from './FormWrapper';
import { useFormStep } from '@/hooks/useFormStep';
import { FormProvider, useForm } from 'react-hook-form';
import { onboardingSchema, OnboardingSchema } from '../schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import useAutoSave from '@/hooks/useAutoSave';
import { ISkillsByDepartment, JobType } from '@/types';
import Review_SubmitForm from './Review_SubmitForm';

const steps = [
    'Personal Info',
    'Job Details',
    'Skills',
    'Emergency Contact',
    'Review & Submit'
];

const OnboardingFormLayout = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>();
    const [age, setAge] = useState<number | null>();

    const form = useForm<OnboardingSchema>({
        resolver: zodResolver(onboardingSchema),
        mode: "all",
        defaultValues: {
            personalInfo: {
                fullName: "",
                email: "",
                phoneNumber: "",
                dob: new Date(),
                profilePicture: null,
            },
            jobDetails: {
                jobType: JobType['FullTime'],
                department: "",
                positionTitle: "",
                startDate: new Date(),
                manager: "",
                salary: 30000 as number,
                managerApproved: false,
            },
            skills: {
                primarySkills: [],
                experience: [],
                preferredHours: "",
                remotePreference: 0,
                extraNotes: "",
                managerApproved: false,
            },
            emergency: {
                contactName: "",
                relationship: "",
                phone: "",
                guardian: {
                    name: "",
                    phone: ""
                },
            },
            confirmation: false,
        },
    });
    const { currentStep, nextStep, prevStep } = useFormStep(steps.length);

    useAutoSave(form.watch, (data) => {
        console.log("AutoSaving data", data);
    });

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='my-6'>
                <Stepper steps={steps} currentStep={currentStep} />
            </div>
            <FormProvider {...form}>
                <FormWrapper
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    onNext={nextStep}
                    onBack={prevStep}
                    disableNext={false}
                // disableNext={!form.formState.isValid && !form.formState.isValidating}
                >
                    {currentStep === 0 && <PersonalInfoForm setAge={setAge} />}
                    {currentStep === 1 && <JobDetailsForm selectedDepartment={selectedDepartment as keyof ISkillsByDepartment} setSelectedDepartment={setSelectedDepartment} />}
                    {currentStep === 2 && <SkillsForm selectedDepartment={selectedDepartment as keyof ISkillsByDepartment} />}
                    {currentStep === 3 && <EmergencyContactForm age={age as number} />}
                    {currentStep === 4 && <Review_SubmitForm />}
                </FormWrapper>
            </FormProvider>
        </div >
    );
};

export default OnboardingFormLayout;