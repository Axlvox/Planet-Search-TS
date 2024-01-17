import { useState } from 'react';

const useFilter = (initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const updateSearchTerm = (value) => {
    setSearchTerm(value);
  };

  return [searchTerm, updateSearchTerm];
};

export default useFilter;
