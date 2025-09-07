

export function calculateAge(dob: Date) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    };

    return age;
};

export function isWithinDays(date: Date, days: number) {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + days);
    return date >= today && date <= maxDate;
}