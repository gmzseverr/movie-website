import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Spinner } from "@heroui/react"; // Assuming you want to use the same spinner

const EditMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    description: "",
    duration: "",
    imdbRating: "",
    posterUrl: "",
    trailerUrl: "",
    logoUrl: "",
    wallpaperUrl: "",
    directorName: "",
    actorNames: [],
    genreNames: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Added error state for feedback
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/movies/${id}`);
        const movieData = response.data;

        // Ensure directorName, actorNames, and genreNames are properly set
        const directorName = movieData.director ? movieData.director.name : "";
        const actorNames = movieData.actors
          ? movieData.actors.map((actor) => actor.name)
          : [];
        const genreNames = movieData.genres
          ? movieData.genres.map((genre) => genre.name)
          : [];

        setMovie({
          ...movieData,
          actorNames,
          genreNames,
          directorName,
        });
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "actorNames" || name === "genreNames") {
      // Split by comma, trim spaces, and filter out empty strings
      const values = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setMovie({
        ...movie,
        [name]: values,
      });
    } else {
      setMovie({
        ...movie,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Indicate submission in progress
    setError("");

    // Ensure array fields are handled correctly before sending
    const requestData = {
      ...movie,
      actorNames: movie.actorNames, // These are already arrays from handleChange
      genreNames: movie.genreNames, // These are already arrays from handleChange
    };

    try {
      await api.put(`/movies/admin/update/${id}`, requestData);
      navigate("/admin"); // Navigate back to admin panel on success
    } catch (err) {
      console.error("Error updating movie:", err.response?.data || err.message);
      setError("Failed to update movie. Please check your inputs."); // More user-friendly error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // --- Loading, Error, and Not Found States ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Spinner
          classNames={{ label: "text-red-400 mt-4 text-xl" }}
          label="Loading movie details..."
          variant="wave"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500 text-lg font-semibold px-4 text-center">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors duration-200 shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If movie data is empty after loading and no error, means movie not found (or initial state)
  if (!movie.title && !loading && !error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-lg font-medium px-4 text-center">
        <p>Movie not found.</p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-colors duration-200 shadow-md"
        >
          Back to Admin Panel
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 px-4 sm:px-8 md:px-16 lg:px-24 pb-12">
      {/* Page Title and Back Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center py-8 lg:py-12 mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-400 mb-4 sm:mb-0">
          Edit Movie
        </h1>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold
                     hover:bg-gray-700 transition-colors duration-200 shadow-md"
        >
          Go Back
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
        {/* Movie Poster Section (Left side on larger screens) */}
        <div className="lg:w-1/3 flex-shrink-0 flex justify-center items-start lg:block">
          <img
            src={
              movie.posterUrl ||
              "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={`${movie.title || "Movie"} Poster`}
            className="rounded-lg shadow-md max-w-full h-auto w-64 md:w-80 lg:w-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Poster";
            }}
          />
        </div>

        {/* Edit Form Section (Right side on larger screens) */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/3 flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        >
          {/* Title */}
          <div className="md:col-span-2">
            {" "}
            {/* Takes full width on medium screens */}
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={movie.year}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Duration (Minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              required
            />
          </div>

          {/* IMDb Rating */}
          <div>
            <label
              htmlFor="imdbRating"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              IMDb Rating
            </label>
            <input
              type="number"
              id="imdbRating"
              name="imdbRating"
              value={movie.imdbRating}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              step="0.1"
              required
            />
          </div>

          {/* Director Name */}
          <div>
            <label
              htmlFor="directorName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Director Name
            </label>
            <input
              type="text"
              id="directorName"
              name="directorName"
              value={movie.directorName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            />
          </div>

          {/* Actor Names */}
          <div className="md:col-span-2">
            {" "}
            {/* Takes full width on medium screens */}
            <label
              htmlFor="actorNames"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Actor Names (comma separated)
            </label>
            <input
              type="text"
              id="actorNames"
              name="actorNames"
              value={
                movie.actorNames && movie.actorNames.length > 0
                  ? movie.actorNames.join(", ")
                  : ""
              }
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            />
          </div>

          {/* Genre Names */}
          <div className="md:col-span-2">
            {" "}
            {/* Takes full width on medium screens */}
            <label
              htmlFor="genreNames"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Genre Names (comma separated)
            </label>
            <input
              type="text"
              id="genreNames"
              name="genreNames"
              value={
                movie.genreNames && movie.genreNames.length > 0
                  ? movie.genreNames.join(", ")
                  : ""
              }
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            {" "}
            {/* Takes full width on medium screens */}
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={movie.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              rows="4"
              required
            />
          </div>

          {/* URL Fields (Full width) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <label
                htmlFor="posterUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Poster URL
              </label>
              <input
                type="text"
                id="posterUrl"
                name="posterUrl"
                value={movie.posterUrl}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="wallpaperUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Background URL
              </label>
              <input
                type="text"
                id="wallpaperUrl"
                name="wallpaperUrl"
                value={movie.wallpaperUrl}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="logoUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Logo URL
              </label>
              <input
                type="text"
                id="logoUrl"
                name="logoUrl"
                value={movie.logoUrl}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="trailerUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Trailer URL
              </label>
              <input
                type="text"
                id="trailerUrl"
                name="trailerUrl"
                value={movie.trailerUrl}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading} // Disable during submission
              className={`cursor-pointer px-8 py-3 rounded-lg font-semibold text-xl transition-colors duration-200 shadow-md
                         ${
                           loading
                             ? "bg-gray-400 cursor-not-allowed"
                             : "bg-red-400 hover:bg-red-500 text-white"
                         }`}
            >
              {loading ? "Updating..." : "Update Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
