import React, { useMemo, useState } from "react";

import { MONTH_NAMES, WEEK_DAY_NAMES, MODES } from "../../consts";
import { dymmyData } from "../../data";
import {
  formatDate,
  checkIsCurrentDate,
  createMonthDashboard,
} from "../../utils";

import {
  MonthDashboardStyled,
  MonthDayStyled,
  WeekDaysStyled,
  WeekDayStyled,
} from "./styled";
import { OrganizerBlockWrapper } from "../common/styled";
import { WeekHeader } from "../week-header/WeekHeader";
import { YearMonthHeader } from "../year-month-header";
import { useCallback } from "react";

export const MonthDashboard = ({
  data,
  setSelectedDate,
  setMode,
  year,
  month,
}) => {
  const monthDays = useMemo(() => {
    return createMonthDashboard({ year, month });
  }, [month, year]);

  const onClick = useCallback(
    (date) => {
      setSelectedDate(date);
      setMode(MODES.DAY);
    },
    [setSelectedDate]
  );

  return (
    <>
      <MonthDashboardStyled>
        {monthDays.map((el) => {
          const isCurrentMonth = month === el.getMonth();
          const isCurrentDate = checkIsCurrentDate(el);

          return (
            <MonthDayStyled
              isCurrentMonth={isCurrentMonth}
              isCurrentDate={isCurrentDate}
              onClick={() => onClick(el)}
            >
              {formatDate(el)}
            </MonthDayStyled>
          );
        })}
      </MonthDashboardStyled>
    </>
  );
};
