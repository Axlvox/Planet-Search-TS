import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { applyFilters, sortPlanets } from '../components/filterUtils';

const planets = [
  { name: 'Tatooine', rotation_period: '23', orbital_period: '304', diameter: '10465', climate: 'arid', gravity: '1 standard', terrain: 'desert', surface_water: '1', population: '200000', films: [], created: '2014-12-09T13:50:49.641000Z', edited: '2014-12-20T20:58:18.411000Z', url: 'https://swapi.dev/api/planets/1/' },
  { name: 'Alderaan', rotation_period: '24', orbital_period: '364', diameter: '12500', climate: 'temperate', gravity: '1 standard', terrain: 'grasslands, mountains', surface_water: '40', population: '2000000000', films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'], created: '2014-12-10T11:35:48.479000Z', edited: '2014-12-20T20:58:18.420000Z', url: 'https://swapi.dev/api/planets/2/' },

];

describe('Teste os Filtros', () => {

  it('deve retornar a lista completa quando não há filtros aplicados', () => {
    const filteredPlanets = applyFilters(planets, [], {}, '');

    expect(filteredPlanets).toEqual(planets);
  });
});

describe('Teste a ordenação', () => {
  it('deve ordenar planetas corretamente em ordem ascendente', () => {
    const sortOrder = { column: 'diameter', sort: 'ASC' };
    const sortedPlanets = sortPlanets(planets, sortOrder);

    expect(sortedPlanets[0].name).toBe('Tatooine');
    expect(sortedPlanets[1].name).toBe('Alderaan');
  });

  it('deve ordenar planetas corretamente em ordem descendente', () => {
    const sortOrder = { column: 'diameter', sort: 'DESC' };
    const sortedPlanets = sortPlanets(planets, sortOrder);

    expect(sortedPlanets[0].name).toBe('Alderaan');
    expect(sortedPlanets[1].name).toBe('Tatooine');
  });

  it('deve manter a ordem original se a coluna é "unknown"', () => {
    const sortOrder = { column: 'unknownColumn', sort: 'ASC' };
    const sortedPlanets = sortPlanets(planets, sortOrder);

    expect(sortedPlanets).toEqual(planets);
  });
});


it('Teste a funcionalidade dos filtros', async () => {
  render(<App />);

  const valueButton = screen.getByTestId('value-filter');
  fireEvent.change(valueButton, { target: { value: '2000000000' } });

  const columnButton = screen.getByTestId('column-filter');
  fireEvent.change(columnButton, { target: { value: 'diameter' } });

  const filterButton = screen.getByTestId('button-filter');
  fireEvent.click(filterButton);

});

it('Teste a pesquisa e filtro', () => {
  render(<App />);

  const column = screen.getByTestId('column-filter');
  expect(column).toBeInTheDocument();

  fireEvent.change(column, { target: { value: 'population' } });
  expect(column).toHaveDisplayValue('population');

  const nameButton = screen.getByTestId('name-filter');
  expect(nameButton).toBeInTheDocument();

  fireEvent.change(nameButton, { target: { value: 'Tatooine' } });
  expect(nameButton).toHaveDisplayValue('Tatooine');

});