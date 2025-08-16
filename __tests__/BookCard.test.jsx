import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookCard from '@/app/componentes/BookCard';

const libroMock = {
  id: 1,
  title: "El Quijote",
  author: "Miguel de Cervantes",
  coverUrl: "https://ejemplo.com/quijote.jpg",
  estado: "proximo"
};

test('renderiza título, autor y portada', () => {
  render(<BookCard libro={libroMock} />);

  expect(screen.getByText("El Quijote")).toBeInTheDocument();
  expect(screen.getByText("Miguel de Cervantes")).toBeInTheDocument();

  const img = screen.getByAltText(/Portada de El Quijote/i);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', libroMock.coverUrl);
});

//test 2
test('llama a cambiarEstado con los argumentos correctos al clickear botones', async () => {
  const cambiarEstadoMock = jest.fn();
  render(<BookCard libro={libroMock} cambiarEstado={cambiarEstadoMock} />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /En Curso/i }));
  expect(cambiarEstadoMock).toHaveBeenCalledWith(libroMock.id, "enCurso");

  await user.click(screen.getByRole('button', { name: /Marcar como Leído/i }));
  expect(cambiarEstadoMock).toHaveBeenCalledWith(libroMock.id, "leido");

  await user.click(screen.getByRole('button', { name: /Eliminar/i }));
  expect(cambiarEstadoMock).toHaveBeenCalledWith(libroMock.id, null);
});

