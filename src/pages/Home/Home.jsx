import React, { useState, useMemo } from "react";
import {movies,  GENRES } from "../../data/movies";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieCarousel from "../../components/MovieCarousel/Moviecarousel";
import "./index.css";

const Home = () => {
  // Currently selected genre filter (default is "All")
  const [activeGenre, setActiveGenre] = useState("All");

  // Top 16 movies sorted by rating (highest first) — for "Trending Now" carousel
  const topMoviesList = useMemo(() => {
    return [...movies]
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 16);
  }, []);

  // Movies released in 2015 or later — for "Fresh Releases" carousel
  const recentMoviesList = useMemo(() => {
    return movies.filter((movie) => movie.year >= 2015).slice(0, 16);
  }, []);

  // Movies filtered by the active genre selection
  const movieList = useMemo(() => {
    if (activeGenre === "All") {
      return movies; // Show all movies
    }
    return movies.filter((movie) => movie.genre === activeGenre);
  }, [activeGenre]);

  // When user clicks a genre chip
  const handleGenreClick = (genreName) => {
    setActiveGenre(genreName);
  };

  return (
    <div className="home-page">

      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover your next favourite</h1>
          <p className="hero-subtitle">
            Explore our library of {movies.length} blockbusters across Action, Drama,
            Sci-Fi and more. Save your picks to Watch Later.
          </p>
        </div>
      </section>

      {/* Auto-scrolling Movie Carousels */}
      <section className="carousels-container">
        <MovieCarousel title="Trending Now" movies={topMoviesList} direction="left" />
        <MovieCarousel title="Fresh Releases" movies={recentMoviesList} direction="right" />
      </section>

      {/* Genre Filter and Movie Grid */}
      <section className="grid-section">
        <h2 className="section-title">Explore Movies</h2>

        {/* Genre filter buttons */}
        <div className="filter-chips">
          {GENRES.map((genreName) => (
            <button
              key={genreName}
              className={`chip-btn ${activeGenre === genreName ? "active" : ""}`}
              onClick={() => handleGenreClick(genreName)}
              id={`genre-chip-${genreName}`}
            >
              {genreName}
            </button>
          ))}
        </div>

        {/* Display filtered movie cards */}
        {movieList.length > 0 ? (
          <div className="movies-grid">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-grid-state">
            <span className="empty-icon">🎬</span>
            <p className="empty-text">No movies found for this genre.</p>
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;
