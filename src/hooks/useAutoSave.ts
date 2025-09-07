'use client'

import { useEffect, useRef } from "react"
import { FieldValues, UseFormWatch } from "react-hook-form"


const useAutoSave = <T extends FieldValues>(
    watch: UseFormWatch<T>,
    onSave?: (data: T) => void
) => {

    const latestData = useRef<T | undefined>(undefined);

    useEffect(() => {
        const subscription = watch((value) => {
            latestData.current = value as T;

            console.log("Auto-saved:", latestData.current);

            if (onSave) {
                onSave(latestData.current)
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, onSave]);
};

export default useAutoSave;