import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "./AddIcon";

const MovieCard = ({ movie, isAuthenticated }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = () => {
    setIsAdded(!isAdded);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Film Posteri - Detay Sayfasına Link */}
      <Link to={`/movies/${movie.id}`} className="block flex-shrink-0">
        <img
          src={movie.posterUrl || "/default-movie-poster.jpg"}
          alt={`${movie.title} poster`}
          className="w-full h-auto rounded-t-lg object-cover group-hover:opacity-90 transition-opacity duration-300"
          onError={(e) => {
            e.target.src = "/default-movie-poster.jpg";
          }}
        />
      </Link>

      {/* Film Detayları */}
      <div className="p-4 flex-grow flex flex-col text-gray-900 dark:text-gray-100">
        <div className="flex-grow">
          <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
            <Link
              to={`/movies/${movie.id}`}
              className="hover:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              {movie.title}{" "}
              <span className="text-gray-500 dark:text-gray-400 text-base font-normal ml-1">
                ({movie.year})
              </span>
            </Link>
          </h2>

          <div className="flex items-center mb-3 text-sm">
            <span className="bg-yellow-500 text-gray-900 px-2 py-0.5 rounded font-bold mr-3 text-xs">
              IMDb: {movie.imdbRating}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
            {movie.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-center pt-2">
          <Link
            to={`/movies/${movie.id}`}
            className="text-red-400 hover:text-red-300 dark:hover:text-red-300 font-medium transition-colors duration-200 text-base"
          >
            View Details
          </Link>
          <div className="flex justify-end mt-2">
            <Link to={`/movies/${movie.id}#trailer`}>
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-3xl text-red-400 hover:text-red-300 dark:hover:text-red-300 transition-colors duration-200"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
