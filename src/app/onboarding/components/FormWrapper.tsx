"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingSchema } from "../schemas";
import { useFormContext } from "react-hook-form";

interface FormWrapperProps {
    children: ReactNode;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onBack: () => void;
    isSubmitting?: boolean;
    disableNext?: boolean;
}

const FormWrapper = ({ children, currentStep, totalSteps, onNext, onBack, isSubmitting = false, disableNext = false }: FormWrapperProps) => {
    const form = useFormContext<OnboardingSchema>();

    // const validateStep = async () => {
    //     let fieldsToValidate: (keyof OnboardingSchema)[] = [];

    //     if (currentStep === 0) fieldsToValidate = ["personalInfo"];
    //     if (currentStep === 1) fieldsToValidate = ["jobDetails"];
    //     if (currentStep === 2) fieldsToValidate = ["skills"];
    //     if (currentStep === 3) fieldsToValidate = ["emergency"];
    //     // if (currentStep === 4) fieldsToValidate = ["confirmation"];

    //     const isValid = await form.trigger(fieldsToValidate);

    //     if (isValid) {
    //         onNext();
    //     } else {
    //         console.log("Validation failed on step", currentStep);
    //     }
    // };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl mx-auto">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onNext()
                }}
                className="flex flex-col gap-6"
            >
                <div>{children}</div>

                <div className="flex justify-between pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={currentStep === 0}
                        onClick={onBack}
                    >
                        Back
                    </Button>

                    {currentStep < totalSteps - 1 ? (
                        <Button
                            type="submit"
                            disabled={disableNext || isSubmitting}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={disableNext || isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}


export default FormWrapper;