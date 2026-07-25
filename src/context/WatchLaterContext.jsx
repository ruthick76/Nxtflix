import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const WatchLaterContext = createContext();

// Create the Provider component
export const WatchLaterProvider = ({ children }) => {

  // Load saved movies from localStorage when app starts
  const [savedMovies, setSavedMovies] = useState(() => {
    try {
      const storedData = localStorage.getItem("nxtflix_watch_later");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return Array.isArray(parsedData) ? parsedData : [];
      }
    } catch (error) {
      console.error("Could not load Watch Later list:", error);
    }
    return [];
  });

  // Save to localStorage every time savedMovies changes
  useEffect(() => {
    localStorage.setItem("nxtflix_watch_later", JSON.stringify(savedMovies));
  }, [savedMovies]);

  // Check if a movie is already in the Watch Later list
  const checkInList = (movieId) => {
    return savedMovies.some((movie) => movie.id === Number(movieId));
  };

  // Add movie if not present, remove it if already present
  const handleWatchLater = (selectedMovie) => {
    setSavedMovies((previousList) => {
      const alreadyAdded = previousList.some((movie) => movie.id === selectedMovie.id);

      if (alreadyAdded) {
        // Remove the movie from the list
        return previousList.filter((movie) => movie.id !== selectedMovie.id);
      } else {
        // Add the movie to the list
        return [...previousList, selectedMovie];
      }
    });
  };

  return (
    <WatchLaterContext.Provider value={{ savedMovies, checkInList, handleWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
};

// Custom hook to use Watch Later context easily
export const useWatchLater = () => useContext(WatchLaterContext);
