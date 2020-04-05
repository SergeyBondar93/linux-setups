import React, { useMemo, useState } from "react";

import { MONTH_NAMES, WEEK_DAY_NAMES } from "../../consts";
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

export const MonthDashboard = ({ data = dymmyData }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const monthDays = useMemo(() => {
    return createMonthDashboard({ year, month });
  }, [month, year]);

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
            >
              {formatDate(el)}
            </MonthDayStyled>
          );
        })}
      </MonthDashboardStyled>
    </>
  );
};
