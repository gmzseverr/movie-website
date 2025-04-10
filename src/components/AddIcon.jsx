import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const AddIcon = ({ movie, isAuthenticated }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the movie is already added
    const addedMovies = JSON.parse(localStorage.getItem("addedMovies")) || [];
    const isMovieAdded = addedMovies.some(
      (addedMovie) => addedMovie.id === movie.id
    );
    setIsAdded(isMovieAdded);
  }, [movie.id]);

  const handleClick = () => {
    if (!isAuthenticated) {
      alert("You need to log in to add this movie to your list.");
      return;
    }

    const addedMovies = JSON.parse(localStorage.getItem("addedMovies")) || [];
    if (isAdded) {
      // Remove movie from the list
      const updatedMovies = addedMovies.filter(
        (addedMovie) => addedMovie.id !== movie.id
      );
      localStorage.setItem("addedMovies", JSON.stringify(updatedMovies));
    } else {
      // Add movie to the list
      addedMovies.push(movie);
      localStorage.setItem("addedMovies", JSON.stringify(addedMovies));
    }

    setIsAdded((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className="text-white pl-10 cursor-pointer hover:text-amber-100 text-2xl"
    >
      <FontAwesomeIcon icon={isAdded ? faCheckCircle : faCirclePlus} />
    </button>
  );
};

export default AddIcon;
