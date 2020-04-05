import React, { useMemo, useCallback } from "react";

import { WeekDaysStyled, WeekDayStyled } from "./styled";
import { WEEK_DAY_NAMES } from "../../consts";
import { formatDate } from "../../utils";

export const WeekHeader = ({
  startWeekDate,
  mode,
  setSelectedDate,
  setMode,
}) => {
  const weekDays = useMemo(() => {
    const date = new Date(startWeekDate).getDate();
    const days = new Array(7).fill(0).map((el, i) => {
      return new Date(startWeekDate).setDate(date + i);
    });
    return days.map((date) => new Date(date));
  }, [startWeekDate]);

  const onClick = useCallback(
    (date) => {
      setSelectedDate(date);
      setMode("day");
    },
    [setSelectedDate, setMode]
  );

  return (
    <WeekDaysStyled>
      {weekDays.map((date, i) => {
        return (
          <WeekDayStyled onClick={() => onClick(date)}>
            {WEEK_DAY_NAMES[i]} {mode === "week" && formatDate(date, "DD.MM")}
          </WeekDayStyled>
        );
      })}
    </WeekDaysStyled>
  );
};
