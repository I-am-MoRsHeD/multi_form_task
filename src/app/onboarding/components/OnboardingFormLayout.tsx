'use client'
import React, { useState } from 'react';
import Stepper from './Stepper';
import PersonalInfoForm from './PersonalInfoForm';
import JobDetailsForm from './JobDetailsForm';
import SkillsForm from './SkillsForm';


const steps = [
    'Personal Info',
    'Job Details',
    'Skills',
    'Emergency Contact',
    'Review & Submit'
];

const OnboardingFormLayout = () => {
    const [currentStep, setStep] = useState(2);

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='my-6'>
                <Stepper steps={steps} currentStep={currentStep} />
            </div>
            {currentStep === 0 && <PersonalInfoForm />}
            {currentStep === 1 && <JobDetailsForm />}
            {currentStep === 2 && <SkillsForm />}
        </div>
    );
};

export default OnboardingFormLayout;