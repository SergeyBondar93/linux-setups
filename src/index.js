import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { dymmyData } from "./data";

ReactDOM.render(
  <React.StrictMode>
    <App data={dymmyData} />
  </React.StrictMode>,
  document.getElementById("root")
);
