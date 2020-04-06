import React, { useMemo, useCallback } from "react";

import Select from "@xcritical/select";
import { modeOptions } from "../../consts";
import { changeDisplayMode } from "../../actions/actions";
import { connect } from "react-redux";

const ModeSelector = ({ displayMode, onChangeDisplayMode }) => {
  const option = useMemo(() => {
    return modeOptions.find(({ value }) => value === displayMode);
  }, [displayMode]);

  const onChange = useCallback(({ value }) => onChangeDisplayMode(value));
  return <Select value={option} options={modeOptions} onChange={onChange} />;
};

const mapStateToProps = (state) => {
  return {
    displayMode: state.organizer.displayMode,
  };
};

const mapDispatchToProps = {
  onChangeDisplayMode: changeDisplayMode,
};

const ModeSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeSelector);

export { ModeSelectorContainer as ModeSelector };
