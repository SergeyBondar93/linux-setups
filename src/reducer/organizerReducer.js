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
} from "../actions/consts";
import { getStartWeekDate } from "../utils";
import { MODES } from "../consts";

const DISPLAY_MODE = {
  MONTH: MODES.MOUNTH,
  WEEK: "WEEK",
  DAY: "DAY",
};

const initialState = {
  displayMode: DISPLAY_MODE.MONTH,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  startWeekDate: getStartWeekDate(new Date()),
  selectedDate: new Date(),
  events: [],
};

export const organizer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter(({ id }) => id !== action.payload.id),
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case CHANGE_EVENT:
      const newEvents = state.events.map((event) => {
        if (event.id !== action.payload.id) return event;
        return action.payload;
      });
      return {
        ...state,
        events: newEvents,
      };

    case CHANGE_DISPLAY_MODE:
      return {
        ...state,
        displayMode: action.payload,
      };

    case CHANGE_MONTH:
      return {
        ...state,
        month: action.payload,
      };

    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload,
      };

    case CHANGE_START_WEEK:
      return {
        ...state,
        startWeekDate: action.payload,
      };

    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };

    default:
      return state;
  }
};
