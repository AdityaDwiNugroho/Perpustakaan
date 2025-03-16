export const useFormatDate = (date: string | Date | undefined): string => {
  if (!date) return "Invalid Date";
  
  const formatDate = new Date(date);
  if (isNaN(formatDate.getTime())) return "Invalid Date"; // Handle invalid date

  return formatDate.toLocaleString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta", // Ensure correct timezone
  });
};
