import React, { useEffect, useState } from "react";
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
  const movies = await Promise.all(
    recommendations.map(async (movie) => {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movie.titleId}&apikey=2369f528`
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const recommendations = await getMoviesRecommendations(7, 1000);
        const movies = await getMoviesInfos(recommendations);

        setMovies(movies);
      } catch (error) {
        console.error("Erro ao buscar recomendações de filmes:", error);
      }
      setLoading(false);
    };

    
    fetchMovies();

    console.log('movies', movies);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>FakeAi Movies</h1>
      </header>
      <main>
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
