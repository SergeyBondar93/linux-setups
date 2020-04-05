import React from "react";
import { MONTH_NAMES } from "../../consts";

export const YearMonthHeader = ({ year, month }) => {
  return (
    <div className="month">
      {MONTH_NAMES[month]} {"  "} {year}{" "}
    </div>
  );
};
