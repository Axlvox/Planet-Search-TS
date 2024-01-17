// Table.js
import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import useFilter from '../hooks/useFilter';

function Table() {
  const { planets, loading } = useContext(PlanetContext);
  const [searchTerm, setSearchTerm] = useFilter();

  if (loading) {
    return <p>Loading...</p>;
  }

  const column = Object.keys(planets[0] || {}).map((key) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

  const applyFilters = (data, term) => {
    return data.filter((planet) => planet.name.toLowerCase()
      .includes(term.toLowerCase()));
  };

  const filteredPlanets = applyFilters(planets, searchTerm);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ searchTerm }
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            {column.map(({ key, label }) => (
              <th key={ key }>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {column.map(({ key }) => (
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
