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

const App = ({ data = dymmyData }) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [startWeekDate, setStartWeekDate] = useState(
    getStartWeekDate(new Date())
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [mode, setMode] = useState("month");

  return (
    <Wrapper>
      <OrganizerBlockWrapper position={"LEFT"}>
        <Calendar
          setStartWeekDate={setStartWeekDate}
          year={year}
          month={month}
          setMode={setMode}
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
          <YearMonthHeader year={year} month={month} />
          <ModeSelector mode={mode} setMode={setMode} />
        </div>
        {mode === "day" ? (
          <DayHeader date={selectedDate} />
        ) : (
          <WeekHeader
            setSelectedDate={setSelectedDate}
            setMode={setMode}
            startWeekDate={startWeekDate}
            mode={mode}
          />
        )}

        {mode === "month" && (
          <MonthDashboard
            setSelectedDate={setSelectedDate}
            year={year}
            month={month}
            setMode={setMode}
          />
        )}
        {mode === "week" && (
          <Week year={year} month={month} startWeekDate={startWeekDate} />
        )}
        {mode === "day" && (
          <DayWrapper>
            <Day year={year} month={month} date={selectedDate} />
          </DayWrapper>
        )}
      </OrganizerBlockWrapper>
    </Wrapper>
  );
};

export default App;
