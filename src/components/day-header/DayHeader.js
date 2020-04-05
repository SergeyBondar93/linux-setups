import React from "react";
import { WeekDayStyled } from "../week-header/styled";
import { WEEK_DAY_NAMES } from "../../consts";
import { formatDate } from "../../utils";

export const DayHeader = ({ date }) => {
  return (
    <div>
      {WEEK_DAY_NAMES[date.getDay()]} {formatDate(date, "DD.MM")}
    </div>
  );
};
