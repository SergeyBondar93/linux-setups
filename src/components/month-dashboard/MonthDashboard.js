import React, { useMemo } from "react";

import { MODES } from "../../consts";
import {
  formatDate,
  checkIsCurrentDate,
  createMonthDashboard,
} from "../../utils";

import { MonthDashboardStyled, MonthDayStyled } from "./styled";
import { useCallback } from "react";
import { connect } from "react-redux";
import { changeDisplayMode, changeSelectedDate } from "../../actions/actions";
import { Events } from "../events/Events";

const MonthDashboard = ({
  onChangeSelectedDate,
  onChangeDisplayMode,
  year,
  month,
  events,
}) => {
  const monthDays = useMemo(() => {
    const $events = events.map(({ eventDate, ...event }) => {
      const newEventDate = formatDate(new Date(eventDate), "YYYY-MM-DD");
      return {
        eventDate: newEventDate,
        ...event,
      };
    });

    const days = createMonthDashboard({ year, month });

    const daysWithEvents = days.map((date) => {
      const formatToEventDate = formatDate(date, "YYYY-MM-DD");

      const events = $events.filter(({ eventDate }) => {
        return eventDate === formatToEventDate;
      });
      return {
        date,
        events,
      };
    });
    return daysWithEvents;
  }, [month, year, events]);

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
        {monthDays.map(({ date, events }) => {
          const isCurrentMonth = month === date.getMonth();
          const isCurrentDate = checkIsCurrentDate(date);
          return (
            <MonthDayStyled
              isCurrentMonth={isCurrentMonth}
              isCurrentDate={isCurrentDate}
              onClick={() => onClick(date)}
            >
              {formatDate(date)}
              <Events events={events} />
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
    events: state.organizer.events,
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
