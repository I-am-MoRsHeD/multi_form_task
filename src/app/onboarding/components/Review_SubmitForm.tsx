"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingSchema } from "../schemas";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { transformFormData } from "@/utils/transformData";

const Review_SubmitForm = () => {
    const { getValues, register } = useFormContext<OnboardingSchema>();
    const rawData = getValues();
    const transformed = transformFormData(rawData);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review Your Information</h2>

            <Card>
                <CardContent className="space-y-2 p-4">
                    <h3 className="font-medium">Personal Info</h3>
                    <p><b>Full Name:</b> {transformed.fullName}</p>
                    <p><b>Email:</b> {transformed.email}</p>
                    <p><b>Phone:</b> {transformed.phone}</p>
                    <p><b>Date of Birth:</b> {transformed.dob}</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2 p-4">
                    <h3 className="font-medium">Job Details</h3>
                    <p><b>Department:</b> {transformed.department}</p>
                    <p><b>Position:</b> {transformed.positionTitle}</p>
                    <p><b>Start Date:</b> {transformed.startDate}</p>
                    <p><b>Job Type:</b> {transformed.jobType}</p>
                    <p><b>Salary:</b> {transformed.salary}</p>
                    <p><b>Manager:</b> {transformed.manager}</p>
                    {transformed.managerApproved && <p>✅ Manager Approved</p>}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2 p-4">
                    <h3 className="font-medium">Skills & Preferences</h3>
                    <p><b>Skills:</b></p>
                    <ul className="list-disc pl-5">
                        {transformed.skills.map((s) => (
                            <li key={s.name}>
                                {s.name} — {s.exp} years
                            </li>
                        ))}
                    </ul>
                    <p><b>Preferred Hours:</b> {transformed.preferredHours}</p>
                    <p><b>Remote Preference:</b> {transformed.remotePreference}%</p>
                    {transformed.extraNotes && <p><b>Notes:</b> {transformed.extraNotes}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2 p-4">
                    <h3 className="font-medium">Emergency Contact</h3>
                    <p><b>Name:</b> {transformed.emergencyContact.name}</p>
                    <p><b>Relationship:</b> {transformed.emergencyContact.relationship}</p>
                    <p><b>Phone:</b> {transformed.emergencyContact.phone}</p>
                    {transformed.emergencyContact.guardian?.name ? (
                        <p>
                            <b>Guardian:</b> {transformed.emergencyContact.guardian.name} (
                            {transformed.emergencyContact.guardian.phone})
                        </p>
                    ) : null}

                </CardContent>
            </Card>

            <div className="flex items-center gap-2">
                <Checkbox id="confirmation" {...register("confirmation")} />
                <Label htmlFor="confirmation">I confirm all information is correct</Label>
            </div>
        </div>
    );
};

export default Review_SubmitForm;
