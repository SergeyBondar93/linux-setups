import styled from "styled-components";
import { scrollbarCssVisible, scrollbarCssHidden } from "../common/scrollbar";

export const WeekWrapper = styled.div`
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
