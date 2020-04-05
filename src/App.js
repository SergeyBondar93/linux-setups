import React, { useMemo, useState } from "react";

import { dymmyData } from "./data";
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

const App = ({ data = dymmyData }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [startWeekDate, setStartWeekDate] = useState(
    getStartWeekDate(new Date())
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [mode, setMode] = useState(MODES.MOUNTH);

  return (
    <Wrapper>
      <OrganizerBlockWrapper position={"LEFT"}>
        <Calendar
          setStartWeekDate={setStartWeekDate}
          year={year}
          month={month}
          setMode={setMode}
          setMonth={setMonth}
          setYear={setYear}
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
          <YearMonthHeader
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
          <ModeSelector mode={mode} setMode={setMode} />
        </div>
        {mode === MODES.DAY ? (
          <DayHeader date={selectedDate} />
        ) : (
          <WeekHeader
            setSelectedDate={setSelectedDate}
            setMode={setMode}
            startWeekDate={startWeekDate}
            mode={mode}
          />
        )}

        {mode === MODES.MOUNTH && (
          <MonthDashboard
            setSelectedDate={setSelectedDate}
            year={year}
            month={month}
            setMode={setMode}
          />
        )}
        {mode === MODES.WEEK && (
          <Week year={year} month={month} startWeekDate={startWeekDate} />
        )}
        {mode === MODES.DAY && (
          <DayWrapper>
            <Day year={year} month={month} date={selectedDate} />
          </DayWrapper>
        )}
      </OrganizerBlockWrapper>
    </Wrapper>
  );
};

export default App;
