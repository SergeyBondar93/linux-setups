import React, { useMemo } from "react";

import { WeekDaysStyled, WeekDayStyled } from "./styled";
import { WEEK_DAY_NAMES } from "../../consts";
import { formatDate } from "../../utils";

export const WeekHeader = ({ startWeekDate, mode }) => {
  const weekDays = useMemo(() => {
    const date = new Date(startWeekDate).getDate();
    const days = new Array(7).fill(0).map((el, i) => {
      return new Date(startWeekDate).setDate(date + i);
    });
    return days.map((date) => new Date(date));
  }, [startWeekDate]);

  return (
    <WeekDaysStyled>
      {weekDays.map((date, i) => {
        return (
          <WeekDayStyled>
            {WEEK_DAY_NAMES[i]} {mode === "week" && formatDate(date, "DD.MM")}
          </WeekDayStyled>
        );
      })}
    </WeekDaysStyled>
  );
};
