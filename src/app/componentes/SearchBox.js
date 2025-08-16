'use client';
import { useState } from "react";


export default function SearchBox({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      // Tomamos los primeros 10 libros
      const books = data.docs.slice(0, 10).map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "Desconocido",
        year: book.first_publish_year || "N/A",
        coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null
      }));

      onResults(books); // enviamos resultados al padre
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar libros..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ maxWidth: "300px" }}
      />
      <button
        className="btn btn-primary"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Buscando..." : "Buscar libro"}
      </button>
    </div>
  );
}