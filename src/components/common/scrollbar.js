import { css } from "styled-components";

export const scrollbarCssVisible = css`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  :focus {
    outline: none;
  }
`;
export const scrollbarCssHidden = css`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0);
  }
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  :focus {
    outline: none;
  }
`;
