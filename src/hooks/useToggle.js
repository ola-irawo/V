import React, { useState } from "react";

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue((oldValue) => !oldValue);
  return [value, toggle];
};

export default useToggle;
