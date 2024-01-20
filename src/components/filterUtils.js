export const applyFilters = (planets, appliedFilters, sortOrder, searchTerm) => {
  if (!planets) {
    return [];
  }

  const applyCompar = (planet, filter) => {
    const planetValue = parseFloat(planet[filter.column]);
    const filterValue = parseFloat(filter.value);

    switch (filter.comparison) {
      case 'maior que':
        return planetValue > filterValue;
      case 'menor que':
        return planetValue < filterValue;
      case 'igual a':
        return planetValue === filterValue;
      default:
        return true;
    }
  };

  const applySearchTermFilter = (planet) => (searchTerm
    ? planet.name.toLowerCase().includes(searchTerm.toLowerCase()) : true);

  const applyFilter = (planet) => (
    appliedFilters.every((filter) => applyCompar(planet, filter))
    && applySearchTermFilter(planet)
  );

  return planets.filter(applyFilter);
};

export const sortPlanets = (planets, sortOrder) => {
  const compareFunction = (planetA, planetB) => {
    const valueA = planetA[sortOrder.column];
    const valueB = planetB[sortOrder.column];

    if (valueA === 'unknown' && valueB === 'unknown') return 0;
    if (valueA === 'unknown') return 1;
    if (valueB === 'unknown') return -1;

    return sortOrder.sort === 'ASC' ? parseFloat(valueA) - parseFloat(valueB)
      : parseFloat(valueB) - parseFloat(valueA);
  };

  return planets.slice().sort(compareFunction);
};
