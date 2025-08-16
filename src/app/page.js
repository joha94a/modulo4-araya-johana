'use client';
import { useState } from "react";
import { useEffect } from "react";
import BookList from "../app/componentes/BookList";
import SearchBox from "./componentes/SearchBox";
import Modal from "./componentes/modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  //Carga libros cuando inicia
  const [librosConst, setLibros] = useState([
    {
      id: 1,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      estado: "leido",
      coverUrl: "https://covers.openlibrary.org/b/id/8231996-M.jpg",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      estado: "leido",
      coverUrl: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
    },
    {
      id: 3,
      title: "El Hobbit",
      author: "J.R.R. Tolkien",
      estado: "proximo",
      coverUrl: "https://covers.openlibrary.org/b/id/6979861-M.jpg",
    },
  ]);


  const handleSearchResults = (results) => {
    setSearchResults(results);
    setModalOpen(true);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setLibros((prev) =>
      prev.map((libro) =>
        libro.id === id ? { ...libro, estado: nuevoEstado } : libro
      )
    );
  };

  const agregarLibro = (libro, estado) => {
    // Evito duplicados por ID
    if (librosConst.some((l) => l.id === libro.id)) {
      alert("El libro ya está en tu biblioteca");
      return;
    }
    setLibros((prev) => [...prev, { ...libro, estado }]);
    setModalOpen(false);
  };

  //Cargar desde localStorage cuando inicia
  useEffect(() => {
    const savedBooks = localStorage.getItem("myBooks");
    if (savedBooks) {
      setLibros(JSON.parse(savedBooks)); //Cambié a libros
    }
  }, []);

  //Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(librosConst)); //Cambié a libros
  }, [librosConst]);


  return (
    <div className="bg-dark min-vh-100 py-5 text-white">
      <main className="container">
        <h1 className="text-center mb-4">Mi biblioteca</h1>

        <div className="text-center mb-5">
          <SearchBox onResults={handleSearchResults} />
        </div>


        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h5>Resultados de búsqueda</h5>
          <BookList libros={searchResults} cambiarEstado={cambiarEstado} agregarLibro={agregarLibro} />
        </Modal>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-4">
            <div className="custom-column">
              <h5 className="text-center text-white mb-3">Últimos leídos</h5>
              <BookList libros={librosConst.filter(l => l.estado === "leido")} cambiarEstado={cambiarEstado} />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="custom-column">
              <h5 className="text-center text-white mb-3">En curso</h5>
              <BookList libros={librosConst.filter(l => l.estado === "enCurso")} cambiarEstado={cambiarEstado} />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="custom-column">
              <h5 className="text-center text-white mb-3">Próxima lectura</h5>
              <BookList libros={librosConst.filter(l => l.estado === "proximo")} cambiarEstado={cambiarEstado} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}