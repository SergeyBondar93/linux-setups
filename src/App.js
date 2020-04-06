import React, { useState } from "react";

import { MonthDashboard } from "./components/month-dashboard/MonthDashboard";
import { Calendar } from "./components/calendar";
import { Wrapper, OrganizerBlockWrapper } from "./components/common/styled";
import { Week } from "./components/week/Week";
import { YearMonthHeader } from "./components/year-month-header";
import { WeekHeader } from "./components/week-header";
import { ModeSelector } from "./components/mode-selector";
import { DayHeader } from "./components/day-header";
import { getStartWeekDate } from "./utils";
import { Day } from "./components/day";
import { DayWrapper } from "./components/day/styled";
import { MODES } from "./consts";
import { connect } from "react-redux";

const App = ({ data, displayMode }) => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  return (
    <Wrapper>
      <OrganizerBlockWrapper position={"LEFT"}>
        <Calendar
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      </OrganizerBlockWrapper>
      <OrganizerBlockWrapper position={"RIGHT"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <YearMonthHeader setSelectedWeek={setSelectedWeek} />
          <ModeSelector />
        </div>
        {displayMode === MODES.DAY ? <DayHeader /> : <WeekHeader />}

        {displayMode === MODES.MOUNTH && <MonthDashboard />}
        {displayMode === MODES.WEEK && <Week />}
        {displayMode === MODES.DAY && (
          <DayWrapper>
            <Day />
          </DayWrapper>
        )}
      </OrganizerBlockWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.organizer.displayMode,
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
