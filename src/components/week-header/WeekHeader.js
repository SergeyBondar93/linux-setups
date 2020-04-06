import React, { useMemo, useCallback } from "react";

import { WeekDaysStyled, WeekDayStyled } from "./styled";
import { WEEK_DAY_NAMES, MODES } from "../../consts";
import { formatDate } from "../../utils";
import {
  changeDisplayMode,
  changeStartWeek,
  changeSelectedDate,
} from "../../actions/actions";
import { connect } from "react-redux";

const WeekHeader = ({
  startWeekDate,
  displayMode,
  onChangeSelectedDate,
  onChangeDisplayMode,
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
      onChangeSelectedDate(date);
      onChangeDisplayMode(MODES.DAY);
    },
    [onChangeSelectedDate, onChangeDisplayMode]
  );

  return (
    <WeekDaysStyled>
      {weekDays.map((date, i) => {
        return (
          <WeekDayStyled onClick={() => onClick(date)}>
            {WEEK_DAY_NAMES[i]}{" "}
            {displayMode === MODES.WEEK && formatDate(date, "DD.MM")}
          </WeekDayStyled>
        );
      })}
    </WeekDaysStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.organizer.displayMode,
    startWeekDate: state.organizer.startWeekDate,
  };
};

const mapDispatchToProps = {
  onChangeDisplayMode: changeDisplayMode,
  onChangeSelectedDate: changeSelectedDate,
};

const WeekHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekHeader);

export { WeekHeaderContainer as WeekHeader };
