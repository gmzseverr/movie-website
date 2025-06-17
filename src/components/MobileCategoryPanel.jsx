import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MobileCategoryPanel = ({ onClose }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api
      .get("/genres")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[calc(100%-60px)] overflow-y-auto
                 bg-white dark:bg-gray-900 shadow-lg z-40 py-4 px-6 animate-slide-in-up"
      style={{ bottom: "60px" }} // MobileBottomNavbar'ın üstünde kalması için
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Categories
        </h2>
        <button
          onClick={onClose}
          className="text-4xl text-red-400 focus:outline-none hover:text-red-300 dark:hover:text-red-300 transition-colors duration-200"
          aria-label="Close categories"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <ul className="space-y-4">
        {genres.length > 0 ? (
          genres.map((genre) => (
            <li key={genre.id}>
              <Link
                to={`/genres/${genre.id}/movies`}
                className="block py-3 text-xl font-bold text-gray-900 dark:text-gray-100
                           hover:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                onClick={onClose} // Linke tıklandığında paneli kapat
              >
                {genre.name}
              </Link>
            </li>
          ))
        ) : (
          <li className="py-2 text-gray-500 dark:text-gray-400 text-base">
            No categories available.
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileCategoryPanel;
