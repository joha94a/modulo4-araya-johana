import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '@/app/componentes/SearchBox';

global.fetch = jest.fn();

test('no ejecuta búsqueda si input está vacío o con espacios', async () => {
  render(<SearchBox onResults={() => {}} />);
  const input = screen.getByPlaceholderText(/buscar libros/i);
  const button = screen.getByRole('button', { name: /buscar libro/i });
  
  await userEvent.click(button);
  expect(fetch).not.toHaveBeenCalled();

  await userEvent.clear(input);
  await userEvent.type(input, '    ');
  await userEvent.click(button);
  expect(fetch).not.toHaveBeenCalled();
});
