import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AddMovie() {
  const [movieData, setMovieData] = useState({
    title: "",
    year: "",
    description: "",
    duration: "",
    imdbRating: "",
    posterUrl: "",
    trailerUrl: "",
    wallpaperUrl: "",
    logoUrl: "",
    directorName: "",
    actorNames: "", // Will be split into array on submit
    genreNames: "", // Will be split into array on submit
  });
  const [loading, setLoading] = useState(false); // State for submission loading
  const [error, setError] = useState(""); // State for submission error

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    // Prepare data, ensuring arrays are properly formatted and numbers are parsed
    const movieRequest = {
      ...movieData,
      year: parseInt(movieData.year, 10), // Specify radix 10
      duration: parseInt(movieData.duration, 10),
      imdbRating: parseFloat(movieData.imdbRating),
      actorNames: movieData.actorNames
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== ""),
      genreNames: movieData.genreNames
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== ""),
    };

    try {
      const response = await api.post("/movies/admin/add", movieRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Movie added successfully!");
        navigate("/admin"); // Redirect to admin panel on success
      }
    } catch (err) {
      console.error("Error adding movie:", err.response?.data || err.message);
      setError("Failed to add movie. Please check your inputs and try again.");
      alert(
        "Failed to add movie. See console for details or check error message."
      ); // User feedback
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 px-4 sm:px-8 md:px-16 lg:px-24 pb-12">
      {/* Page Title */}
      <h1 className="text-3xl pt-8 sm:text-4xl font-extrabold text-red-400 mb-8 text-center">
        Add New Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5"
      >
        {/* Title */}
        <div className="md:col-span-2">
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
            value={movieData.title}
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
            value={movieData.year}
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
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={movieData.duration}
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
            value={movieData.imdbRating}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            step="0.1" // Allow decimal input
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
            value={movieData.directorName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            required // Made required, usually a director is essential
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={movieData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            rows="4"
            required
          />
        </div>

        {/* Actor Names */}
        <div className="md:col-span-2">
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
            value={movieData.actorNames}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            placeholder="e.g., Tom Hanks, Meryl Streep"
          />
        </div>

        {/* Genre Names */}
        <div className="md:col-span-2">
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
            value={movieData.genreNames}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            placeholder="e.g., Action, Drama, Sci-Fi"
          />
        </div>

        {/* URL Fields - Grouped together for visual clarity */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
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
              value={movieData.posterUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              required
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
              value={movieData.trailerUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="wallpaperUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Wallpaper URL
            </label>
            <input
              type="text"
              id="wallpaperUrl"
              name="wallpaperUrl"
              value={movieData.wallpaperUrl}
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
              value={movieData.logoUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 shadow-sm outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`cursor-pointer px-8 py-3 rounded-lg font-semibold text-xl transition-colors duration-200 shadow-md
                       ${
                         loading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-red-400 hover:bg-red-500 text-white"
                       }`}
          >
            {loading ? "Adding Movie..." : "Add Movie"}
          </button>
        </div>

        {error && (
          <div className="md:col-span-2 text-center text-red-500 mt-4 text-sm font-medium">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddMovie;
