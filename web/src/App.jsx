import React from "react";
import MovieList from "./components/MovieList";
import "./styles.css";

const movies = [
  {
    id: 1,
    title: "Inception",
    description: "A mind-bending thriller by Christopher Nolan.",
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A classic sci-fi action film.",
  },
  {
    id: 3,
    title: "Interstellar",
    description: "An epic journey through space and time.",
  },
];

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>FakeAi Movies</h1>
      </header>
      <main>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default App;
