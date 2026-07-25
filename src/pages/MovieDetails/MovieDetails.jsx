import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import {movies} from "../../data/movies";
import { useWatchLater } from "../../context/WatchLaterContext";
import "./index.css";

const MovieDetails = () => {
  const { id } = useParams();           // Get movie id from the URL
  const navigate = useNavigate();
  const { checkInList, handleWatchLater } = useWatchLater();

  // Find the movie matching the URL id
  const selectedMovie = movies.find((movie) => movie.id === Number(id));

  // If no movie found with this id, redirect to Not Found page
  if (!selectedMovie) {
    return <Navigate to="/not-found" replace />;
  }

  // Check if this movie is already saved to Watch Later
  const isMovieSaved = checkInList(selectedMovie.id);

  // Add or remove movie from Watch Later list
  const handleWatchLaterClick = () => {
    handleWatchLater(selectedMovie);
  };

  // Go back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="movie-details-page">

      {/* Full-width backdrop image at the top */}
      <div
        className="backdrop-container"
        style={{ backgroundImage: `url(${selectedMovie.backdrop})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      {/* Movie information section */}
      <div className="details-container">

        {/* Go Back button */}
        <button className="back-btn" onClick={handleGoBack} id="movie-details-back-btn">
          <span className="arrow">←</span> Go Back
        </button>

        <div className="details-content">

          {/* Movie Poster */}
          <div className="details-poster">
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="poster-img"
            />
          </div>

          {/* Movie Info */}
          <div className="details-info">
            <h1 className="details-title">{selectedMovie.title}</h1>

            {/* Rating, Year, Duration, Genre */}
            <div className="details-meta">
              <span className="rating-badge-large">
                <span className="star-icon">★</span> {selectedMovie.rating}
              </span>
              <span className="meta-item">{selectedMovie.year}</span>
              <span className="meta-divider">|</span>
              <span className="meta-item">{selectedMovie.duration}</span>
              <span className="meta-divider">|</span>
              <span className="genre-tag">{selectedMovie.genre}</span>
            </div>

            {/* Movie Description */}
            <div className="details-overview-section">
              <h3 className="section-subtitle">Overview</h3>
              <p className="details-overview">{selectedMovie.overview}</p>
            </div>

            {/* Watch Later toggle button */}
            <button
              className={`watch-later-toggle-btn ${isMovieSaved ? "saved" : ""}`}
              onClick={handleWatchLaterClick}
              id="watch-later-toggle-btn"
            >
              {isMovieSaved ? (
                <>
                  <span className="btn-icon">✓</span> Added to Watch Later
                </>
              ) : (
                <>
                  <span className="btn-icon">+</span> Watch Later
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
