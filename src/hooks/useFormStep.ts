'use client'

import { useState } from "react"

export const useFormStep = (totalSteps: number) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const goToStep = (step: number) => {
        if (step >= 0 && step < totalSteps) {
            setCurrentStep(step);
        }
    };

    const resetSteps = () => setCurrentStep(0);

    return {
        currentStep,
        nextStep,
        prevStep,
        goToStep,
        resetSteps,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps - 1
    };
};
