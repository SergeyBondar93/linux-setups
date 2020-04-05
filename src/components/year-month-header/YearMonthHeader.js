import React, { useCallback, useMemo } from "react";

import Select from "@xcritical/select";

import { yearOptions, monthOptions } from "../../consts";

export const YearMonthHeader = ({ year, month, setYear, setMonth }) => {
  const onChangeYear = useCallback(
    ({ value }) => {
      setYear(value);
    },
    [setMonth, setYear]
  );
  const onChangeMonth = useCallback(
    ({ value }) => {
      setMonth(value);
    },
    [setMonth, setYear]
  );

  const $year = useMemo(() => {
    return yearOptions.find(({ value }) => value === year);
  }, [year, month]);
  const $month = useMemo(() => {
    return monthOptions.find(({ value }) => value === month);
  }, [month]);

  return (
    <div>
      <Select
        value={$month}
        options={monthOptions}
        onChange={onChangeMonth}
        isSearchable
      ></Select>
      <Select
        value={$year}
        options={yearOptions}
        onChange={onChangeYear}
        isSearchable
      ></Select>
    </div>
  );
};
