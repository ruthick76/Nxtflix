import { GENRES } from "../../data/movies.js";
import "./index.css";

export default function GenreFilterBar({ activeGenre, onSelectGenre }) {
  return (
    <div className="genre-bar" role="tablist" aria-label="Filter movies by genre">
      {GENRES.map((genre) => {
        const isActive = genre === activeGenre;

        return (
          <button
            key={genre}
            type="button"
            role="tab"
            aria-selected={isActive}
            // Highlight the pill if it's currently selected 
            className={`genre-chip ${isActive ? "genre-chip--active" : ""}`}
            onClick={() => onSelectGenre(genre)}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}