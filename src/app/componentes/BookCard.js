import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles.css";

function BookCard({libro, cambiarEstado, agregarLibro}) {
  return (
    <div className="card m-2" style={{ maxWidth: '300px', minWidth: '250px' }}>
      {libro.coverUrl && (
        <img
          src={libro.coverUrl}
          alt={`Portada de ${libro.title}`}
          className="card-img-top"
          style={{ objectFit: "cover", height: "150px" }}
        />
      )}
      <div className="card-body d-flex flex-column align-items-center text-center">
        <h6 className="card-title">{libro.title}</h6>
        <p className="card-text">{libro.author}</p>

        {agregarLibro ? (
          <>
            <button className="btn btn-primary btn-sm mb-1 w-100" onClick={() => agregarLibro(libro, "leido")}>Agregar a Leídos</button>
            <button className="btn btn-primary btn-sm mb-1 w-100" onClick={() => agregarLibro(libro, "enCurso")}>Agregar a En Curso</button>
            <button className="btn btn-primary btn-sm w-100" onClick={() => agregarLibro(libro, "proximo")}>Agregar a Próximos</button>
          </>
        ) : (
          <>
            {libro.estado === "leido" && (
              <button className="btn btn-primary btn-sm w-100" onClick={() => cambiarEstado(libro.id, null)}>Quitar de Leídos</button>
            )}
            {libro.estado === "enCurso" && (
              <>
                <button className="btn btn-primary btn-sm mb-1 w-100" onClick={() => cambiarEstado(libro.id, "leido")}>Marcar como Leído</button>
                <button className="btn btn-primary btn-sm w-100" onClick={() => cambiarEstado(libro.id, null)}>Eliminar</button>
              </>
            )}
            {libro.estado === "proximo" && (
              <>
                <button className="btn btn-primary btn-sm mb-1 w-100" onClick={() => cambiarEstado(libro.id, "enCurso")}>En Curso</button>
                <button className="btn btn-primary btn-sm mb-1 w-100" onClick={() => cambiarEstado(libro.id, "leido")}>Marcar como Leído</button>
                <button className="btn btn-primary btn-sm w-100" onClick={() => cambiarEstado(libro.id, null)}>Eliminar</button>
              </>
            )}
            {!libro.estado && (
              <button className="btn btn-primary btn-sm w-100" onClick={() => cambiarEstado(libro.id, "enCurso")}>Agregar a En Curso</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookCard;