import React, { useState } from "react";
import Modal from "./MovieModal";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="movie-card" onClick={openModal}>
        <img 
          className="movie-poster" 
          src={movie.poster}
          alt={`${movie.title} Poster`} 
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-description">Nota: {movie.averageRating}</p>
        </div>
      </div>

      {isModalOpen && <Modal movie={movie} onClose={closeModal} />}
    </>
  );
};

export default MovieCard;
