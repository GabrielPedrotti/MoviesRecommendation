import React from "react";
import "./Modal.css";

const Modal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{movie.title}</h2>
        <img 
          className="modal-poster" 
          src={movie.poster} 
          alt={`${movie.title} Poster`} 
        />

        <p><strong>Nota:</strong> {movie.averageRating}</p>
        <p><strong>Gênero:</strong> {movie.genre}</p>
        <p><strong>Elenco:</strong> {movie.actors}</p>
        <p><strong>Sinopse:</strong> {movie.plot}</p>
        <p><strong>Duração:</strong> {movie.runtime}</p>
        <p><strong>Lançado:</strong> {movie.released}</p>
      </div>
    </div>
  );
};

export default Modal;
