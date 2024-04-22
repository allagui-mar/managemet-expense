export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string passed to getFormattedDate");
  }

  return date.toISOString().slice(0, 10);
};

export const getDatesMinusDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};
