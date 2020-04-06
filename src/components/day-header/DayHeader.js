import React from "react";
import { WeekDayStyled } from "../week-header/styled";
import { WEEK_DAY_NAMES } from "../../consts";
import { formatDate } from "../../utils";
import { connect } from "react-redux";

const DayHeader = ({ selectedDate }) => {
  return (
    <div>
      {WEEK_DAY_NAMES[selectedDate.getDay()]}{" "}
      {formatDate(selectedDate, "DD.MM")}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDate: state.organizer.selectedDate,
  };
};

const DayHeaderContainer = connect(mapStateToProps)(DayHeader);

export { DayHeaderContainer as DayHeader };
