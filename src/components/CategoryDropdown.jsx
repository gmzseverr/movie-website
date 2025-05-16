import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../api/api";

const CategoryDropdown = () => {
  const [genres, setGenres] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Fetch categories from API
    api
      .get("/genres") // API URL
      .then((response) => {
        setGenres(response.data); //
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  return (
    <li className="relative z-50">
      <button
        className="hover:text-lg font-semibold cursor-pointer"
        onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
      >
        Categories
      </button>
      {/* Dropdown menu */}
      {dropdownVisible && (
        <ul className="absolute bg-black text-white p-4 w-[150px] rounded-md shadow-lg z-50 top-full gap-2">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <li key={genre.id}>
                <Link
                  to={`/genres/${genre.id}/movies`}
                  className="block py-2 px-4 hover:bg-gray-700 cursor-pointer"
                >
                  {genre.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No categories available</li>
          )}
        </ul>
      )}
    </li>
  );
};

export default CategoryDropdown;
