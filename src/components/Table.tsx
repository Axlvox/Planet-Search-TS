import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import useFilter from '../hooks/useFilter';
import useNumber from '../hooks/useNumber';

function Table() {
  const { planets, loading } = useContext(PlanetContext);

  const [searchTerm, setSearchTerm] = useFilter();
  const [appliedFilters, setAppliedFilters] = useState([]);

  const {
    column,
    comparison,
    value,
    updateColumn,
    updateComparison,
    updateValue,
    reset: resetNumberFilter,
  } = useNumber('population', 'maior que', 0);

  const applyNumericFilter = () => {
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

  const handleFilterClick = () => {
    applyNumericFilter();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  let displayedPlanets = planets;

  if (searchTerm) {
    displayedPlanets = displayedPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(searchTerm.toLowerCase()));
  }

  appliedFilters.forEach((filter) => {
    displayedPlanets = displayedPlanets.filter((planet) => {
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
    });
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
        {['population',
          'orbital_period',
          'diameter',
          'rotation_period',
          'surface_water'].map((option) => (
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
          <li key={ index }>
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </li>
        ))}
      </ul>

      <table>
        <thead>
          <tr>
            {Object.keys(planets[0] || {}).map((key) => (
              <th key={ key }>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.keys(planets[0] || {}).map((key) => (
                <td key={ `${planet.name}-${key}` }>{planet[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
