import BookCard from "./BookCard";

function BookList({libros, cambiarEstado, agregarLibro}) {
  if (libros.length === 0) return <p>No hay libros en esta sección.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
      {libros.map((libro) => (
        <BookCard
          key={libro.id}
          libro={libro}
          cambiarEstado={cambiarEstado}
          agregarLibro={agregarLibro}
        />
      ))}
    </div>
  );
}

export default BookList;