import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Ensure this path is correct

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/movies")
      .then((response) => {
        // Assuming movie.id is a string/UUID, sorting numerically might not be intended.
        // If IDs are actual numbers, this is fine. If they are UUIDs, consider sorting by title or year.
        // For UUIDs, a simple string sort or no sort might be more appropriate.
        // const sortedMovies = response.data.sort((a, b) => a.id - b.id); // This might cause issues with non-numeric IDs
        setMovies(response.data); // Keep original order or apply a different sort if needed
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const openDeleteModal = (movie, e) => {
    e.stopPropagation(); // Prevent row click from triggering
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const confirmDelete = () => {
    api
      .delete(`movies/admin/remove/${selectedMovie.id}`)
      .then(() => {
        setMovies((prev) => prev.filter((m) => m.id !== selectedMovie.id));
        setShowModal(false);
        setSelectedMovie(null);
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        // Optionally, display an error message to the user
      });
  };

  const handleEdit = (id, e) => {
    e.stopPropagation(); // Prevent row click from triggering
    navigate(`/admin/edit/${id}`);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="container mx-auto mt-4 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="overflow-x-auto">
        {" "}
        {/* Added for better mobile responsiveness */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100">
            {movies.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No movies found.
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {movie.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {movie.title}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={(e) => openDeleteModal(movie, e)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                    </button>
                    <button
                      onClick={(e) => handleEdit(movie.id, e)}
                      className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-lg"
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Ensure this button's click doesn't trigger the row click
                        handleMovieClick(movie.id);
                      }}
                      className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                      title="View"
                    >
                      <FontAwesomeIcon icon={faEye} className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>{" "}
      {/* End of overflow-x-auto */}
      {/* Delete Confirmation Modal */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
              Confirm Deletion
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 text-center">
              Are you sure you want to remove "
              <strong className="text-red-500">{selectedMovie.title}</strong>"
              permanently?
            </p>
            <div className="flex flex-col items-center">
              {/* Optional: Display movie image in modal if available and relevant */}
              {selectedMovie.posterUrl && (
                <img
                  src={selectedMovie.posterUrl} // Changed from selectedMovie.image to posterUrl
                  alt={selectedMovie.title}
                  className="w-32 h-auto object-cover rounded-md mb-4 shadow-sm"
                  onError={(e) => {
                    e.target.src = "/default-movie-poster.jpg";
                  }}
                />
              )}
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors duration-200 shadow-md"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors duration-200 shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovieList;
