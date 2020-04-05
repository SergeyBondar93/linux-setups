import React, { useMemo, useState, useCallback } from "react";

import { MONTH_NAMES, WEEK_DAY_NAMES, MODES } from "../../consts";
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
  HeaderWrapper,
} from "./styled";

export const Calendar = ({
  data = dymmyData,
  year,
  month,
  setStartWeekDate,
  setMode,
  setMonth,
  setYear,
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
    setMode(MODES.WEEK);
  }, []);

  const onChangeMonth = useCallback(
    (changes) => {
      if (month + changes > 11) {
        setMonth(0);
        setYear(year + 1);
      } else if (month + changes > 0) {
        setMonth(month + changes);
      } else if (month + changes < 0) {
        setMonth(11);
        setYear(year - 1);
      }
    },
    [year, month, setYear, setMonth]
  );

  return (
    <>
      <HeaderWrapper>
        <button onClick={() => onChangeMonth(-1)}>{"<="}</button>
        {MONTH_NAMES[month]}
        <button onClick={() => onChangeMonth(1)}>=></button>
      </HeaderWrapper>

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
