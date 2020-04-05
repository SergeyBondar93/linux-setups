import {
  GET_EVENTS,
  REMOVE_EVENT,
  CREATE_EVENT,
  CHANGE_EVENT,
} from "../actions/consts";

const DISPLAY_MODE = {
  MONTH: "MONTH",
  WEEK: "WEEK",
  DAY: "DAY",
};

const initialState = {
  displayMode: DISPLAY_MODE.MONTH,
};

export const organizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        events: action.payload,
      };
    case REMOVE_EVENT:
      return {
        events: state.events.filter(({ id }) => id !== action.payload.id),
      };
    case CREATE_EVENT:
      return {
        events: [...state.events, action.payload],
      };
    case CHANGE_EVENT:
      const newEvents = state.events.map((event) => {
        if (event.id !== action.payload.id) return event;
        return action.payload;
      });
      return {
        events: newEvents,
      };

    default:
      return state;
      break;
  }
};
