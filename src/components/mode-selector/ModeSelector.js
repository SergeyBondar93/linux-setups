import React, { useMemo, useCallback } from "react";

import Select from "@xcritical/select";
import { modeOptions } from "../../consts";

export const ModeSelector = ({ mode, setMode }) => {
  const option = useMemo(() => {
    return modeOptions.find(({ value }) => value === mode);
  }, [mode]);

  const onChange = useCallback(({ value }) => setMode(value));
  return <Select value={option} options={modeOptions} onChange={onChange} />;
};
