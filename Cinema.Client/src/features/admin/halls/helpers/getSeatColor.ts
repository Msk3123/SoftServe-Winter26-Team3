const SPECIAL_COLORS: Record<string, string> = {
    "VIP": "#FFD700",
    "Premium": "#C0C0C0",
    "Lux": "#4B0082",
    "Platinum": "#E5E4E2",

    "LoveSeats": "#FF69B4",
    "Double": "#E63946",
    "Sofa": "#A4161A",

    "4DX": "#00F5FF",
    "IMAX": "#1E90FF",
    "D-Box": "#FF4500",

    "Standart": "var(--bg-main)",
    "Regular": "var(--bg-main)",
    "Base":"var(--bg-main)",
    "Student": "#4CAF50",
    "Wheelchair": "#007AFF",
    "Economy": "#546E7A",

    "Broken": "#333333",
    "Reserved": "#212121",
};

export const getSeatColor = (name: string): string => {
    const formattedName = name.trim();
    if (SPECIAL_COLORS[formattedName]) {
        return SPECIAL_COLORS[formattedName];
    }

    return hashColor(formattedName);
};

const hashColor = (name:string)=>{
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}