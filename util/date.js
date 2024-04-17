export const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDatesMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getMonth() - days);
};
