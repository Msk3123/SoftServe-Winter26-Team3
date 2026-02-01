export function capitalizeFirstLetter(str:string):string {
    if (str.length === 0) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function dateToDayFirst(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

export function dateToYearFirst(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
