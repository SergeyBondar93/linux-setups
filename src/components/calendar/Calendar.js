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
import { connect } from "react-redux";
import {
  changeStartWeek,
  changeDisplayMode,
  changeMonth,
  changeYear,
} from "../../actions/actions";

const Calendar = ({
  year,
  month,
  onChangeStartWeekDate,
  onChangeMode,
  onChangeMonth,
  onChangeYear,
  selectedWeek,
  setSelectedWeek,
}) => {
  const [hoveredWeek, setHoveredWeek] = useState(null);

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
    onChangeStartWeekDate(startWeekDate);
    setSelectedWeek(weekNumber);
    onChangeMode(MODES.WEEK);
  }, []);

  const handleChangeMonth = useCallback(
    (changes) => {
      setSelectedWeek(null);
      if (month + changes > 11) {
        onChangeMonth(0);
        onChangeYear(year + 1);
      } else if (month + changes > 0) {
        onChangeMonth(month + changes);
      } else if (month + changes < 0) {
        onChangeMonth(11);
        onChangeYear(year - 1);
      }
    },
    [year, month, onChangeYear, onChangeMonth]
  );

  return (
    <>
      <HeaderWrapper>
        <button onClick={() => handleChangeMonth(-1)}>{"<="}</button>
        {MONTH_NAMES[month]}
        <button onClick={() => handleChangeMonth(1)}>=></button>
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

const mapStateToProps = (state) => {
  return {
    year: state.organizer.year,
    month: state.organizer.month,
  };
};

const mapDispatchToProps = {
  onChangeStartWeekDate: changeStartWeek,
  onChangeMode: changeDisplayMode,
  onChangeMonth: changeMonth,
  onChangeYear: changeYear,
};

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export { CalendarContainer as Calendar };
