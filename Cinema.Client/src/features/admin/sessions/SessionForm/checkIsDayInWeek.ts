const checkIsDayInPeriod = (dayOfWeek: number, startDate: string, endDate: string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return false; 
    }

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays >= 6) {
        return true;
    }

    const current = new Date(start);
    while (current <= end) {
        if (current.getDay() === dayOfWeek) {
            return true;
        }
        current.setDate(current.getDate() + 1);
    }

    return false;
};

export default checkIsDayInPeriod;