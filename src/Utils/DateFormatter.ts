export default function dateFormatter(dateToFormat: string): string {
  const dateObj = new Date(dateToFormat);

  const year = dateObj.getFullYear();

  let month: number | string = dateObj.getMonth() + 1;
  if (month.toString().length === 1) month = `0${month}`;

  let day: number | string = dateObj.getDate();
  if (day.toString().length === 1) day = `0${day}`;


  const dateStr = `${month}/${day}/${year}`;

  return dateStr;
};
