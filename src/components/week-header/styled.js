import styled from "styled-components";

export const WeekDaysStyled = styled.div`
  width: 100%;
  min-width: 700px;
  display: flex;
  height: 50px;
`;
export const WeekDayStyled = styled.div`
  width: calc(100% / 7);
  outline: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
