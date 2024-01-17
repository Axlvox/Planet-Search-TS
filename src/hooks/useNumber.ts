import { useState } from 'react';

const useNumber = (
  initialColumn = 'population',
  initialComparison = 'maior que',
  initialValue = 0,
) => {
  const [column, setColumn] = useState(initialColumn);
  const [comparison, setComparison] = useState(initialComparison);
  const [value, setValue] = useState(initialValue);

  const updateColumn = (selectedColumn) => {
    setColumn(selectedColumn);
  };

  const updateComparison = (selectedComparison) => {
    setComparison(selectedComparison);
  };

  const updateValue = (inputValue) => {
    setValue(inputValue);
  };

  const reset = () => {
    setColumn(initialColumn);
    setComparison(initialComparison);
    setValue(initialValue);
  };

  return {
    column,
    comparison,
    value,
    updateColumn,
    updateComparison,
    updateValue,
    reset,
  };
};

export default useNumber;
