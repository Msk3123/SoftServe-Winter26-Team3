export interface DateOption {
    label: string;      // "Wed, Feb 4"
    subLabel: string;   // "Today" / "Tomorrow"
    value: string;      // "2026-02-04" (для ключів у groupedSessions)
}

export const generateDateOptions = (count: number = 7): DateOption[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return Array.from({ length: count }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        
        const dateStr = d.toISOString().split('T')[0]; // Геруємо YYYY-MM-DD
        
        let subLabel = '';
        if (i === 0) subLabel = 'Today';
        else if (i === 1) subLabel = 'Tomorrow';

        return {
            label: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`,
            subLabel,
            value: dateStr
        };
    });
};

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
