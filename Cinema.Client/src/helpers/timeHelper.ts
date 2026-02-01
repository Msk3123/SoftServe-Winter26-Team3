export const formatDuration = (seconds: number | undefined | null): string => {
    if (!seconds || seconds <= 0) return "0m";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const hDisplay = hours > 0 ? `${hours}h ` : "";
    const mDisplay = minutes > 0 ? `${minutes}m` : "";

    return (hDisplay + mDisplay).trim() || "0m";
};