import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCard;
