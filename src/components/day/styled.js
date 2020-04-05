import styled from "styled-components";
import { scrollbarCssHidden, scrollbarCssVisible } from "../common/scrollbar";

export const DayWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 8px);
  min-width: 700px;
  height: 700px;
  overflow: auto;
  ${scrollbarCssHidden};
  :hover {
    ${scrollbarCssVisible};
  }
`;
