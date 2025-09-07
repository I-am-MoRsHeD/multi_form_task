export interface IPersonalInfo {
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: Date;
    profilePicture?: File;
};

export enum Departments {
    Engineering = "Engineering",
    Marketing = "Marketing",
    Sales = "Sales",
    HR = "HR",
    Finance = "Finance"
};

export enum JobType {
    FullTime = "Full Time",
    PartTime = "Part Time",
    Contract = "Contract",
}

export interface IManagerInfo {
    id: string;
    name: string;
    department: string;
};

export interface ISkillsByDepartment {
    Engineering: string[];
    Marketing: string[];
    Sales: string[];
    HR: string[];
    Finance: string[];
}