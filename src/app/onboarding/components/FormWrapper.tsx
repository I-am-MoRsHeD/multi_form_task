"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

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
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl mx-auto">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onNext();
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