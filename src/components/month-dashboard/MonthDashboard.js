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
import { connect } from "react-redux";
import { changeDisplayMode, changeSelectedDate } from "../../actions/actions";

const MonthDashboard = ({
  onChangeSelectedDate,
  onChangeDisplayMode,
  year,
  month,
}) => {
  const monthDays = useMemo(() => {
    return createMonthDashboard({ year, month });
  }, [month, year]);

  const onClick = useCallback(
    (date) => {
      onChangeSelectedDate(date);
      onChangeDisplayMode(MODES.DAY);
    },
    [onChangeSelectedDate]
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

const mapStateToProps = (state) => {
  return {
    year: state.organizer.year,
    month: state.organizer.month,
  };
};

const mapDispatchToProps = {
  onChangeDisplayMode: changeDisplayMode,
  onChangeSelectedDate: changeSelectedDate,
};

const MonthDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthDashboard);

export { MonthDashboardContainer as MonthDashboard };
