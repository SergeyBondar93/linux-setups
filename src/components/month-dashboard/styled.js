import styled from "styled-components";

export const MonthDashboardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-width: 700px;
  height: 700px;
`;
export const MonthDayStyled = styled.div`
  width: calc(100% / 7);
  outline: 1px solid gray;
  transition: 0.2s;
  background-color: ${({ isCurrentMonth, isCurrentDate }) => {
    if (isCurrentDate) return "rgb(247, 177, 85)";
    if (isCurrentMonth) return "rgb(255, 221, 176)";
    return "white";
  }};
  :hover {
    background-color: rgb(232, 238, 201);
  }
`;

export const MonthDashboardWrapperStyled = styled.div`
  margin: 15px;
`;
