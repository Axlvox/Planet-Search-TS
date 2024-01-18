import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

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