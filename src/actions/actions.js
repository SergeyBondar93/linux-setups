import {
  GET_EVENTS,
  REMOVE_EVENT,
  CREATE_EVENT,
  CHANGE_EVENT,
  CHANGE_DISPLAY_MODE,
  CHANGE_MONTH,
  CHANGE_YEAR,
  CHANGE_START_WEEK,
  CHANGE_SELECTED_DATE,
} from "./consts";

export const getEvents = (payload) => {
  return {
    type: GET_EVENTS,
    payload,
  };
};
export const removeEvents = (payload) => {
  return {
    type: REMOVE_EVENT,
    payload,
  };
};
export const createEvents = (payload) => {
  return {
    type: CREATE_EVENT,
    payload,
  };
};
export const changeEvent = (payload) => {
  return {
    type: CHANGE_EVENT,
    payload,
  };
};
export const changeDisplayMode = (payload) => {
  return {
    type: CHANGE_DISPLAY_MODE,
    payload,
  };
};
export const changeMonth = (payload) => {
  return {
    type: CHANGE_MONTH,
    payload,
  };
};
export const changeYear = (payload) => {
  return {
    type: CHANGE_YEAR,
    payload,
  };
};
export const changeStartWeek = (payload) => {
  return {
    type: CHANGE_START_WEEK,
    payload,
  };
};
export const changeSelectedDate = (payload) => {
  return {
    type: CHANGE_SELECTED_DATE,
    payload,
  };
};
