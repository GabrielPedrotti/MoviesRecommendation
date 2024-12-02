import React, { useState } from "react";
import MovieList from "./components/MovieList";
import "./styles.css";
import axios from "axios";

const getMoviesRecommendations = async (minRating, minVotes) => {
  const response = await axios.get(
    `http://localhost:5000/recommendations?min_rating=${minRating}&min_votes=${minVotes}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.recommendations;
}

const getMoviesInfos = async (recommendations) => {
  const apikey = '' // ! trocar pela apikey do omdb
  const movies = await Promise.all(
    recommendations.map(async (movie) => {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movie.titleId}&apikey=${apikey}`
      );

      return {
        ...movie,
        poster: response.data.Poster,
        actors: response.data.Actors,
        genre: response.data.Genre,
        plot: response.data.Plot,
        runtime: response.data.Runtime,
        released: response.data.Released,
      };
    })
  );

  return movies;
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minRating, setMinRating] = useState(7);
  const [minVotes, setMinVotes] = useState(1000);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const recommendations = await getMoviesRecommendations(minRating, minVotes);
      const movies = await getMoviesInfos(recommendations);
      setMovies(movies);
    } catch (error) {
      console.error("Erro ao buscar recomendações de filmes:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>A.I Movies</h1>
      </header>

      <main>
        <div className="filters">
          <label>
            Rating mínimo:
            <input 
              type="number" 
              value={minRating} 
              onChange={(e) => setMinRating(e.target.value)} 
              min="0" 
              max="10" 
            />
          </label>

          <label>
            Votos mínimos:
            <input 
              type="number" 
              value={minVotes} 
              onChange={(e) => setMinVotes(e.target.value)} 
            />
          </label>

          <button onClick={fetchMovies}>Consultar</button>
        </div>

        {loading ? (
          <p>Carregando recomendações...</p>
        ) : (
          <MovieList movies={movies} />
        )}
      </main>
    </div>
  );
};

export default App;
