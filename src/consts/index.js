export const SHOW_DAYS_IN_CALENDAR = 7 * 7;

export const TIME_INTERVALS = 4 * 24;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK_DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const LEFT_WIDTH = "250px";
export const RIGHT_WIDTH = "100%";

export const MODES = {
  DAY: "DAY",
  WEEK: "WEEK",
  MOUNTH: "MOUNTH",
  YEAR: "YEAR",
};

export const modeOptions = [
  {
    value: MODES.DAY,
    label: "Day",
  },
  {
    value: MODES.WEEK,
    label: "Week",
  },
  {
    value: MODES.MOUNTH,
    label: "Month",
  },
  // {
  //   value: MODES.YEAR,
  //   label: "Year",
  // },
];

const START_YEAR = 2010;
const YEAR_NUMS = 15;

export const yearOptions = new Array(YEAR_NUMS).fill(0).map((_el, i) => {
  const year = START_YEAR + i;

  return { value: year, label: year };
});

export const monthOptions = new Array(12).fill(0).map((_el, i) => ({
  value: i,
  label: MONTH_NAMES[i],
}));
