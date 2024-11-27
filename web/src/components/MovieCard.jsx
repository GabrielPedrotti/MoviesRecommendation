import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
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
  );
};

export default MovieCard;
