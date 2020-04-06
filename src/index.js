import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { dymmyData } from "./data";

import "./index.css";
import { createStore, combineReducers } from "redux";
import { organizer } from "./reducer/organizerReducer";

const store = createStore(
  combineReducers({ organizer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App data={dymmyData} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
