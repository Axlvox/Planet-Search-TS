import React, { useContext, useState, useEffect } from 'react';
import { applyFilters, sortPlanets } from './filterUtils';
import PlanetContext from '../context/PlanetContext';
import useFilter from '../hooks/useFilter';
import useNumber from '../hooks/useNumber';

function Table() {
  const { planets, loading } = useContext(PlanetContext);

  const [searchTerm, setSearchTerm] = useFilter();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });
  const [displayedPlanets, setDisplayedPlanets] = useState(planets);

  const {
    column,
    comparison,
    value,
    updateColumn,
    updateComparison,
    updateValue,
    reset: resetNumberFilter,
  } = useNumber('population', 'maior que', 0);

  useEffect(() => {
    setDisplayedPlanets(applyFilters(planets, appliedFilters, sortOrder, searchTerm));
  }, [planets, appliedFilters, sortOrder, searchTerm]);

  const applyNumericFilter = () => {
    if (!planets) {
      return;
    }

    const filteredPlanets = planets.filter((planet) => {
      const planetValue = parseFloat(planet[column]);
      const filterValue = parseFloat(value);

      switch (comparison) {
        case 'maior que':
          return planetValue > filterValue;
        case 'menor que':
          return planetValue < filterValue;
        case 'igual a':
          return planetValue === filterValue;
        default:
          return true;
      }
    });

    setAppliedFilters([...appliedFilters, { column, comparison, value }]);
    resetNumberFilter();
  };

  const removeNumericFilter = (index) => {
    const removedFilter = appliedFilters[index];
    const updatedFilters = appliedFilters.filter((_, i) => i !== index);
    setAppliedFilters(updatedFilters);
    updateColumn(removedFilter.column);
  };

  const removeAllNumericFilters = () => {
    setAppliedFilters([]);
    resetNumberFilter();
  };

  const handleFilterClick = () => {
    applyNumericFilter();
  };

  const handleSortSubmit = () => {
    const sortedPlanets = sortPlanets(displayedPlanets, sortOrder);
    setDisplayedPlanets(sortedPlanets);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  let availableColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  appliedFilters.forEach((filter) => {
    availableColumns = availableColumns.filter((option) => option !== filter.column);
  });

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ searchTerm }
        onChange={ (e) => setSearchTerm(e.target.value) }
      />

      <select
        data-testid="column-filter"
        value={ column }
        onChange={ (e) => updateColumn(e.target.value) }
      >
        {availableColumns.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => updateComparison(e.target.value) }
      >
        {['maior que', 'menor que', 'igual a'].map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => updateValue(e.target.value) }
      />
      <button
        data-testid="button-filter"
        onClick={ () => handleFilterClick() }
      >
        Filtrar
      </button>

      <ul>
        {appliedFilters.map((filter, index) => (
          <li key={ index } data-testid="filter">
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              data-testid={ `button-remove-filter-${index}` }
              onClick={ () => removeNumericFilter(index) }
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div>
        <label htmlFor="column-sort" data-testid="column-sort-label">Ordenar por:</label>
        <select
          id="column-sort"
          data-testid="column-sort"
          value={ sortOrder.column }
          onChange={ (e) => setSortOrder({ ...sortOrder, column: e.target.value }) }
        >
          {availableColumns.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>

        <div>
          <label>
            Ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              checked={ sortOrder.sort === 'ASC' }
              onChange={ () => setSortOrder({ ...sortOrder, sort: 'ASC' }) }
            />
          </label>
          <label>
            Descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              checked={ sortOrder.sort === 'DESC' }
              onChange={ () => setSortOrder({ ...sortOrder, sort: 'DESC' }) }
            />
          </label>
        </div>
        <button
          data-testid="column-sort-button"
          onClick={ () => handleSortSubmit() }
        >
          Ordenar
        </button>
      </div>

      <button
        data-testid="button-remove-filters"
        onClick={ () => removeAllNumericFilters() }
      >
        Remover todas filtragens
      </button>

      <table>
        <thead>
          <tr>
            {planets && planets.length > 0 && Object.keys(planets[0] || {}).map((key) => (
              <th key={ key }>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedPlanets && displayedPlanets.length > 0
          && displayedPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.keys(planets[0] || {}).map((key) => (
                <td
                  key={ `${planet.name}-${key}` }
                  data-testid={ key === 'name' ? 'planet-name' : undefined }
                >
                  {planet[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
