import React, { useCallback, useMemo } from "react";

import Select from "@xcritical/select";

import { yearOptions, monthOptions } from "../../consts";
import { changeMonth, changeYear } from "../../actions/actions";
import { connect } from "react-redux";

const YearMonthHeader = ({
  year,
  month,
  onChangeYear,
  onChangeMonth,
  setSelectedWeek,
}) => {
  const handleChangeYear = useCallback(
    ({ value }) => {
      setSelectedWeek(null);
      onChangeYear(value);
    },
    [onChangeMonth, onChangeYear]
  );
  const handleChangeMonth = useCallback(
    ({ value }) => {
      setSelectedWeek(null);
      onChangeMonth(value);
    },
    [onChangeMonth, onChangeYear]
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
        onChange={handleChangeMonth}
        isSearchable
      ></Select>
      <Select
        value={$year}
        options={yearOptions}
        onChange={handleChangeYear}
        isSearchable
      ></Select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    year: state.organizer.year,
    month: state.organizer.month,
  };
};

const mapDispatchToProps = {
  onChangeMonth: changeMonth,
  onChangeYear: changeYear,
};

const YearMonthHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(YearMonthHeader);

export { YearMonthHeaderContainer as YearMonthHeader };
