import { useEffect, useState, useMemo } from "react"; // Ensure useMemo is imported
import { useParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import { Spinner } from "@heroui/react";
import api from "../api/api";

export default function Movies({ isAuthenticated }) {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState(null); // 'year' veya 'rating'
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        let response;
        if (id) {
          response = await api.get(`/genres/${id}/movies`);
          setMovies(response.data.movies);
          setGenreName(response.data.name);
        } else {
          response = await api.get("/movies");
          setMovies(response.data);
          setGenreName("All");
        }
        // It's good practice to reset sorting or set a default after new data loads
        setSortBy(null); // No initial sort
        setSortOrder("desc");
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  const sortedMovies = useMemo(() => {
    if (!movies || movies.length === 0) {
      return [];
    }

    const sortableMovies = [...movies]; // Create a shallow copy to avoid mutating original state

    if (sortBy === "year") {
      sortableMovies.sort((a, b) => {
        const yearA = a.year || 0;
        const yearB = b.year || 0;
        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
      });
    } else if (sortBy === "rating") {
      sortableMovies.sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || 0;
        const ratingB = parseFloat(b.imdbRating) || 0;
        return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
      });
    }
    return sortableMovies;
  }, [movies, sortBy, sortOrder]); // Re-run when movies, sortBy, or sortOrder changes

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(criteria);
      setSortOrder("desc"); // Default to descending for a new criteria
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex justify-between md:flex-row flex-col items-center py-8 lg:py-12 gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center md:text-left">
          {genreName} Movies
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleSort("year")}
            className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md
                       ${
                         sortBy === "year"
                           ? "bg-red-500 text-white"
                           : "bg-red-400 text-white hover:bg-red-300"
                       }`}
          >
            Sort by Year{" "}
            {sortBy === "year" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button
            onClick={() => handleSort("rating")}
            className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md
                       ${
                         sortBy === "rating"
                           ? "bg-red-500 text-white"
                           : "bg-red-400 text-white hover:bg-red-300"
                       }`}
          >
            Sort by Rating{" "}
            {sortBy === "rating" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner
            classNames={{ label: "text-red-400 mt-4 text-xl" }}
            label="Loading Movies..."
            variant="wave"
          />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-lg font-semibold">
          <p>{error}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-base">
            Please check your internet connection or try refreshing the page.
          </p>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg font-medium">
          No movies found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-12">
          {/* THIS IS THE CRITICAL CHANGE: Use sortedMovies instead of movies */}
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
