import React, { useMemo, useState, useCallback } from "react";

import { MONTH_NAMES, WEEK_DAY_NAMES } from "../../consts";
import { dymmyData } from "../../data";
import {
  formatDate,
  createMonthDashboard,
  checkIsCurrentDate,
  getStartWeekDate,
} from "../../utils";

import {
  MonthDashboardStyled,
  MonthDayStyled,
  WeekDaysStyled,
  WeekDayStyled,
} from "./styled";

export const Calendar = ({
  data = dymmyData,
  year,
  month,
  setStartWeekDate,
}) => {
  const [hoveredWeek, setHoveredWeek] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const monthDays = useMemo(() => {
    return createMonthDashboard({ year, month });
  }, [month, year]);

  const onMouseOver = useCallback((weekNumber) => {
    setHoveredWeek(weekNumber);
  }, []);
  const onMouseLeave = useCallback((weekNumber) => {
    setHoveredWeek(null);
  }, []);
  const onClick = useCallback((weekNumber, date) => {
    const startWeekDate = getStartWeekDate(date);
    setStartWeekDate(startWeekDate);
    setSelectedWeek(weekNumber);
  }, []);

  return (
    <>
      <div className="month">{MONTH_NAMES[month]}</div>

      <WeekDaysStyled>
        {WEEK_DAY_NAMES.map((_el, i) => {
          return <WeekDayStyled>{WEEK_DAY_NAMES[i].slice(0, 3)}</WeekDayStyled>;
        })}
      </WeekDaysStyled>

      <MonthDashboardStyled>
        {monthDays.map((el, i) => {
          const isCurrentMonth = month === el.getMonth();
          const isCurrentDate = checkIsCurrentDate(el);
          const currentWeek = parseInt(i / 7);
          const isCurrentWeekHovered = currentWeek === hoveredWeek;
          const isCurrentWeekSelect = currentWeek === selectedWeek;

          return (
            <MonthDayStyled
              isCurrentMonth={isCurrentMonth}
              isCurrentDate={isCurrentDate}
              isCurrentWeekHovered={isCurrentWeekHovered}
              isCurrentWeekSelect={isCurrentWeekSelect}
              onMouseOver={() => onMouseOver(parseInt(i / 7))}
              onMouseLeave={onMouseLeave}
              onClick={() => onClick(parseInt(i / 7), el)}
            >
              {formatDate(el, "DD")}
            </MonthDayStyled>
          );
        })}
      </MonthDashboardStyled>
    </>
  );
};
