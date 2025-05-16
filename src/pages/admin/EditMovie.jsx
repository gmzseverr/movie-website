import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

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
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/movies/${id}`)
      .then((response) => {
        const movieData = response.data;

        const directorName = movieData.director ? movieData.director.name : "";
        // Aktör isimlerini sadece isimler olarak al
        const actorNames = movieData.actors.map((actor) => actor.name);
        // Türleri de sadece isimler olarak al
        const genreNames = movieData.genres.map((genre) => genre.name);

        setMovie({
          ...movieData,
          actorNames, // actorNames'i dizilere dönüştür
          genreNames, // genreNames'i dizilere dönüştür
          directorName,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is for actorNames or genreNames, handle them as arrays
    if (name === "actorNames" || name === "genreNames") {
      const values = value.split(",").map((item) => item.trim());
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for backend
    const requestData = {
      ...movie,
      actorNames: Array.isArray(movie.actorNames)
        ? movie.actorNames
        : movie.actorNames.split(",").map((name) => name.trim()),
      genreNames: Array.isArray(movie.genreNames)
        ? movie.genreNames
        : movie.genreNames.split(",").map((name) => name.trim()),
    };

    api
      .put(`/movies/admin/update/${id}`, requestData)
      .then(() => {
        navigate("/admin");
      })
      .catch((error) => {
        console.error(
          "Error updating movie:",
          error.response?.data || error.message
        );
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white pt-20 px-14 sm:px-8 md:px-32 md:p-32">
      <h1 className="text-2xl font-bold mb-4 text-red-800">Edit Movie</h1>
      <button
        type="button"
        onClick={() => navigate(-1)} // Go back button
        className="mt-4 ml-4 bg-gray-700 text-white p-2 rounded-md"
      >
        Back
      </button>
      <div className="flex">
        <div className="w-1/3 mr-6">
          <img
            src={movie.posterUrl || "https://via.placeholder.com/300x450"}
            alt="Movie Poster"
            className="rounded-lg shadow-md"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-2/3 text-white">
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={movie.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={movie.year}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={movie.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium">
              Duration (Minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={movie.duration}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* IMDb Rating */}
          <div className="mb-4">
            <label htmlFor="imdbRating" className="block text-sm font-medium">
              IMDb Rating
            </label>
            <input
              type="number"
              id="imdbRating"
              name="imdbRating"
              value={movie.imdbRating}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              step="0.1"
              required
            />
          </div>

          {/* URLs */}
          <div className="mb-4">
            <label htmlFor="posterUrl" className="block text-sm font-medium">
              Poster URL
            </label>
            <input
              type="text"
              id="posterUrl"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="wallpaperUrl" className="block text-sm font-medium">
              Background URL
            </label>
            <input
              type="text"
              id="wallpaperUrl"
              name="wallpaperUrl"
              value={movie.wallpaperUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="logoUrl" className="block text-sm font-medium">
              Logo URL
            </label>
            <input
              type="text"
              id="logoUrl"
              name="logoUrl"
              value={movie.logoUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="trailerUrl" className="block text-sm font-medium">
              Trailer URL
            </label>
            <input
              type="text"
              id="trailerUrl"
              name="trailerUrl"
              value={movie.trailerUrl}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Director Name */}
          <div className="mb-4">
            <label htmlFor="directorName" className="block text-sm font-medium">
              Director Name
            </label>
            <input
              type="text"
              id="directorName"
              name="directorName"
              value={movie.directorName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="actorNames" className="block text-sm font-medium">
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genreNames" className="block text-sm font-medium">
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-red-800 text-white p-2 rounded-md"
          >
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
