import React, { useMemo, useCallback } from "react";

import Select from "@xcritical/select";

const modeOptions = [
  {
    value: "day",
    label: "day",
  },
  {
    value: "week",
    label: "week",
  },
  {
    value: "month",
    label: "month",
  },
];

export const ModeSelector = ({ mode, setMode }) => {
  const option = useMemo(() => {
    return modeOptions.find(({ value }) => value === mode);
  }, [mode]);

  const onChange = useCallback(({ value }) => setMode(value));
  return <Select value={option} options={modeOptions} onChange={onChange} />;
};
