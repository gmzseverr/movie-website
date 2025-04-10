import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    actorNames: "",
    genreNames: "",
  });

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

    const movieRequest = {
      title: movieData.title,
      year: parseInt(movieData.year),
      description: movieData.description,
      duration: parseInt(movieData.duration),
      imdbRating: parseFloat(movieData.imdbRating),
      posterUrl: movieData.posterUrl,
      trailerUrl: movieData.trailerUrl,
      wallpaperUrl: movieData.wallpaperUrl,
      logoUrl: movieData.logoUrl,
      directorName: movieData.directorName,
      actorNames: movieData.actorNames.split(","),
      genreNames: movieData.genreNames.split(","),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/movies/admin/add", // Backend API endpoint
        movieRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Movie added successfully!");
        navigate("/admin"); // Redirect to admin panel
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white py-12 px-6">
      <h1 className="text-5xl mb-8 text-center font-bold text-red-800">
        Add Movie
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-gray-200">Title</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Year</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Description</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">IMDb Rating</label>
          <input
            type="number"
            name="imdbRating"
            value={movieData.imdbRating}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Poster URL</label>
          <input
            type="text"
            name="posterUrl"
            value={movieData.posterUrl}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Trailer URL</label>
          <input
            type="text"
            name="trailerUrl"
            value={movieData.trailerUrl}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">Wallpaper URL</label>
          <input
            type="text"
            name="wallpaperUrl"
            value={movieData.wallpaperUrl}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-gray-200">Logo URL</label>
          <input
            type="text"
            name="logoUrl"
            value={movieData.logoUrl}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-gray-200">Director Name</label>
          <input
            type="text"
            name="directorName"
            value={movieData.directorName}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div>
          <label className="block text-gray-200">
            Actor Names (comma separated)
          </label>
          <input
            type="text"
            name="actorNames"
            value={movieData.actorNames}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-gray-200">
            Genre Names (comma separated)
          </label>
          <input
            type="text"
            name="genreNames"
            value={movieData.genreNames}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-red-800 text-white p-3 rounded hover:bg-red-700 transition-colors duration-300"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
