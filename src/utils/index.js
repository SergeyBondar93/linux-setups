import { SHOW_DAYS_IN_CALENDAR } from "../consts";

export const getDaysInMonth = (year, month) => {
  /* set last day in next month */
  return new Date(year, month + 1, 0).getDate();
};

export const formatDate = (dateObj, format = "DD.MM.YYYY") => {
  const MM =
    dateObj.getMonth() + 1 < 10
      ? `0${dateObj.getMonth() + 1}`
      : dateObj.getMonth() + 1;
  const YYYY = dateObj.getFullYear();
  const DD = dateObj.getDate();

  const hh =
    dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
  const mm =
    dateObj.getMinutes() < 10
      ? `0${dateObj.getMinutes()}`
      : dateObj.getMinutes();

  if (format === "DD.MM.YYYY") return `${DD}.${MM}.${YYYY}`;
  if (format === "DD.MM") return `${DD}.${MM}`;
  if (format === "DD") return `${DD}`;
  if (format === "object")
    return {
      DD,
      MM: MM - 1,
      YYYY,
    };
  if (format === "hh:mm") {
    return `${hh}:${mm}`;
  }
  if (format === "DD.MM.YYYY hh:mm") {
    return `${DD}.${MM}.${YYYY} ${hh}:${mm}`;
  }
};

export const checkIsCurrentDate = (date) => {
  const currentDate = new Date();

  return (
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getDate() === date.getDate()
  );
};

export const createMonthDashboard = ({ year, month }) => {
  const newMonth = new Date(year, month, 1);
  const daysInMount = getDaysInMonth(year, month);
  const weekDay = newMonth.getDay();

  const beforeMonth = new Array(weekDay)
    .fill(0)
    .map((_el, i) => {
      const date = new Date(year, month, 0 - i);
      return date;
    })
    .reverse();

  const insideMonth = new Array(daysInMount).fill(0).map((_el, i) => {
    const date = new Date(year, month, i + 1);
    return date;
  });

  const afterMonth = new Array(SHOW_DAYS_IN_CALENDAR - weekDay - daysInMount)
    .fill(0)
    .map((_el, i) => {
      const date = new Date(year, month + 1, i + 1);
      return date;
    });

  const newMonthDays = [...beforeMonth, ...insideMonth, ...afterMonth];
  return newMonthDays;
};

export const getStartWeekDate = (date) => {
  const clickedDay = date.getDay();
  const { DD, MM, YYYY } = formatDate(date, "object");
  const startWeekDate = new Date(YYYY, MM, DD - clickedDay);
  return startWeekDate;
};
