import React, { useMemo } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils";
import { TIME_INTERVALS } from "../../consts";
import { useCallback } from "react";
import { connect } from "react-redux";
import { Events } from "../events/Events";

const DayStyled = styled.div`
  width: calc(100% / 7);
  outline: 1px solid gray;
  transition: 0.2s;
  flex-grow: 2;
`;

const Day = ({ date, events }) => {
  return (
    <DayStyled>
      <Events events={events} />
    </DayStyled>
  );
};

const mapStateToProps = (state, { date }) => {
  const $date = date || state.organizer.selectedDate;

  const formatToEventDate = formatDate($date, "YYYY-MM-DD");
  const $events = state.organizer.events.filter(({ eventDate }) => {
    const newEventDate = formatDate(new Date(eventDate), "YYYY-MM-DD");
    return newEventDate === formatToEventDate;
  });

  return {
    date: $date,
    events: $events,
  };
};

const DayContainer = connect(mapStateToProps)(Day);

export { DayContainer as Day };
