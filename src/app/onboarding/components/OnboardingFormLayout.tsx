'use client'
import React from 'react';
import Stepper from './Stepper';
import PersonalInfoForm from './PersonalInfoForm';
import JobDetailsForm from './JobDetailsForm';
import SkillsForm from './SkillsForm';
import EmergencyContactForm from './EmergencyContactForm';
import FormWrapper from './FormWrapper';
import { useFormStep } from '@/hooks/useFormStep';
import { FormProvider, useForm } from 'react-hook-form';


const steps = [
    'Personal Info',
    'Job Details',
    'Skills',
    'Emergency Contact',
    'Review & Submit'
];

const OnboardingFormLayout = () => {
    const form = useForm({
        mode: "onChange",
        defaultValues: {}
    });
    const { currentStep, nextStep, prevStep } = useFormStep(steps.length);

    // useAutoSave(form.watch);

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
                >
                    {currentStep === 0 && <PersonalInfoForm />}
                    {currentStep === 1 && <JobDetailsForm />}
                    {currentStep === 2 && <SkillsForm />}
                    {currentStep === 3 && <EmergencyContactForm />}
                    {currentStep === 4 && "Finising page"}
                </FormWrapper>
            </FormProvider>
        </div >
    );
};

export default OnboardingFormLayout;