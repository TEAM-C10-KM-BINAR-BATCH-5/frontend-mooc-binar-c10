export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Makassar",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
