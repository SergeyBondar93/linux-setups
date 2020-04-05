import styled from "styled-components";

export const RECT = "250px";

export const MonthDashboardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${RECT};
  height: ${RECT};
`;
export const MonthDayStyled = styled.div`
  width: calc(100% / 7);
  outline: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  background-color: ${({
    isCurrentMonth,
    isCurrentDate,
    isCurrentWeekHovered,
    isCurrentWeekSelect,
  }) => {
    if (isCurrentDate) return "rgb(247, 177, 85)";

    if (isCurrentWeekHovered && isCurrentWeekSelect) return "rgb(136, 196, 24)";
    if (isCurrentWeekSelect) return "rgb(189, 241, 91)";
    if (isCurrentWeekHovered) return "rgb(221, 253, 160)";

    if (isCurrentMonth) return "rgb(255, 221, 176)";

    return "white";
  }};
`;

export const WeekDaysStyled = styled.div`
  width: ${RECT};
  display: flex;
  height: 24px;
`;
export const WeekDayStyled = styled.div`
  width: calc(100% / 7);
  outline: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
