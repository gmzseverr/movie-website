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
    <div className="bg-[#121212] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Film Posteri - Detay Sayfasına Link */}
      <Link to={`/movies/${movie.id}`} className="block flex-shrink-0">
        <img
          src={movie.posterUrl || "/default-movie-poster.jpg"}
          alt={`${movie.title} poster`}
          className="w-full h-96 object-cover hover:opacity-90 transition-opacity"
          onError={(e) => {
            e.target.src = "/default-movie-poster.jpg";
          }}
        />
      </Link>

      {/* Film Detayları */}
      <div className="p-6 flex-grow flex flex-col text-white">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-2">
            <Link
              to={`/movies/${movie.id}`}
              className="hover:text-[#F13030] transition-colors"
            >
              {movie.title}{" "}
              <span className="text-gray-400">({movie.year})</span>
            </Link>
          </h2>

          <div className="flex items-center mb-2">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold mr-2">
              IMDb: {movie.imdbRating}
            </span>
            <span className="text-gray-400">
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
          </div>

          <p className="text-gray-400 mb-4 line-clamp-3">{movie.description}</p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <Link
            to={`/movies/${movie.id}`}
            className="text-[#F13030] hover:text-[#5A0001] font-medium transition-colors"
          >
            View Details
          </Link>
          <div className="flex justify-end mt-2">
            <Link to={`/movies/${movie.id}#trailer`}>
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-2xl text-[#F13030] hover:text-[#5A0001] transition"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
