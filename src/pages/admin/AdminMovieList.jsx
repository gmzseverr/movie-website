import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const AdminMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/movies")
      .then((response) => {
        const sortedMovies = response.data.sort((a, b) => a.id - b.id);
        setMovies(sortedMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const openDeleteModal = (movie, e) => {
    e.stopPropagation();
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const confirmDelete = () => {
    api
      .delete(`/admin/movies/remove/${selectedMovie.id}`)
      .then(() => {
        setMovies((prev) => prev.filter((m) => m.id !== selectedMovie.id));
        setShowModal(false);
        setSelectedMovie(null);
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/admin/edit/${id}`);
  };

  const handleMovieClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="container mx-auto mt-4 bg-[#121212] p-4 rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-gray-400">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className="border-b border-gray-700 cursor-pointer hover:bg-[#1e1e1e] transition-colors duration-200"
              onClick={() => handleMovieClick(movie.id)}
            >
              <td className="px-4 py-2 text-gray-300">{movie.id}</td>
              <td className="px-4 py-2 text-gray-300">{movie.title}</td>
              <td className="px-4 py-2 flex space-x-4 text-lg">
                <button
                  onClick={(e) => openDeleteModal(movie, e)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  onClick={(e) => handleEdit(movie.id, e)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMovieClick(movie.id);
                  }}
                  className="text-green-400 hover:text-green-600 transition-colors"
                  title="View"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-xl w-[90%] max-w-md text-gray-200 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Are you sure to remove this movie?
            </h2>
            <div className="flex flex-col items-center">
              {selectedMovie.image && (
                <img
                  src={selectedMovie.image}
                  alt={selectedMovie.title}
                  className="w-40 h-auto rounded-md mb-3"
                />
              )}
              <p className="text-lg font-medium mb-4">{selectedMovie.title}</p>
              <div className="flex space-x-4">
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded text-white"
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
