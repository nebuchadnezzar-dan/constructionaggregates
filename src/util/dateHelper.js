export const newDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today
    .getMonth()
    .toString()
    .padStart(2, '0');
  const day = today
    .getDate()
    .toString()
    .padStart(2, '2');
  return `${year}-${month}-${day}`;
};
