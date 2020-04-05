import React, { useMemo } from "react";

import { Day } from "../day";
import { WeekWrapper } from "./styled";

export const Week = ({ startWeekDate, year, month }) => {
  const weekDays = useMemo(() => {
    const date = new Date(startWeekDate).getDate();
    const days = new Array(7).fill(0).map((el, i) => {
      return new Date(startWeekDate).setDate(date + i);
    });
    return days.map((date) => new Date(date));
  }, [startWeekDate]);

  return (
    <WeekWrapper>
      {weekDays.map((date) => {
        return <Day date={date} />;
      })}
    </WeekWrapper>
  );
};
