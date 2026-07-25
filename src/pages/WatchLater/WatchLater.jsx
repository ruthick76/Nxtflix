import React from "react";
import { Link } from "react-router-dom";
import { useWatchLater } from "../../context/WatchLaterContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./index.css";

const WatchLater = () => {
  const { savedMovies } = useWatchLater();

  const isListEmpty = savedMovies.length === 0;

  return (
    <div className="watch-later-page">
      <div className="watch-later-container">
        <h1 className="watch-later-title">Watch Later</h1>

        {/* Show empty message if no movies are saved */}
        {isListEmpty ? (
          <div className="empty-watch-later">
            <span className="empty-bookmark-icon">📁</span>
            <p className="empty-message-text">Your Watch Later list is empty.</p>
            <Link to="/" className="browse-link" id="browse-movies-link">
              Browse Movies
            </Link>
          </div>
        ) : (
          /* Show saved movies in a grid */
          <div className="movies-grid">
            {savedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WatchLater;
