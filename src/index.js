import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { dymmyData } from "./data";

import "./index.css";
import { createStore, combineReducers } from "redux";
import { organizer } from "./reducer/organizerReducer";
import { getEvents } from "./actions/actions";

const store = createStore(
  combineReducers({ organizer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

setTimeout(() => {
  store.dispatch(getEvents(dymmyData));
}, 0);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
