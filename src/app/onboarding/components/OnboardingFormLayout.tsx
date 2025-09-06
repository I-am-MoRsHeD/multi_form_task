'use client'
import React, { useState } from 'react';
import Stepper from './Stepper';
import PersonalInfoForm from './PersonalInfoForm';


const steps = [
    'Personal Info',
    'Job Details',
    'Skills',
    'Emergency Contact',
    'Review & Submit'
];

const OnboardingFormLayout = () => {
    const [currentStep, setStep] = useState(0);

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='my-6'>
                <Stepper steps={steps} currentStep={currentStep} />
            </div>
            {currentStep === 0 && <PersonalInfoForm />}
            {/* {currentStep === 0 && <PersonalInfoForm />} */}
        </div>
    );
};

export default OnboardingFormLayout;