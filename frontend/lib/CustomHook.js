import { useState } from 'react';

// Custom hook to set value for input elements
function useInputValue(initValue) {
  const [value, setValue] = useState(initValue);

  const handleValue = e => setValue(e.target.value);

  return {
    handleValue,
    value
  };
}

export { useInputValue };
