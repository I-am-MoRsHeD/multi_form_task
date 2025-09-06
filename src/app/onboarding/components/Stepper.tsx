import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import React from 'react';

interface IProps {
    steps: string[];
    currentStep: number;
}

const Stepper = ({ steps, currentStep }: IProps) => {
    return (
        <div className='flex flex-row items-center justify-between w-full'>
            {steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;

                return (
                    <div key={idx}
                        className='flex-1 flex items-center'>
                        <div
                            className={cn(
                                "flex flex-col items-center text-sm font-medium relative",
                                isCompleted ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-600"
                            )}>
                            <div className='flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white'>
                                <Circle className='w-6 h-6' />
                            </div>
                            <span className='mt-2'>{step}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Stepper;