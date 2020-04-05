import styled, { css } from "styled-components";
import { LEFT_WIDTH, RIGHT_WIDTH } from "../../consts";

export const Wrapper = styled.div`
  display: flex;
`;

export const OrganizerBlockWrapper = styled.div`
  margin: 15px;
  ${({ position }) => {
    if (position === "LEFT") {
      return css`
        width: ${LEFT_WIDTH};
      `;
    } else if (position === "RIGHT") {
      return css`
        width: ${RIGHT_WIDTH};
      `;
    }
  }}
`;
