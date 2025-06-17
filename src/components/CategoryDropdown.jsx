// src/components/CategoryDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Bu bileşen artık sadece masaüstü header'da kullanılacak
const CategoryDropdown = () => {
  const [genres, setGenres] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLinkClick = () => {
    setDropdownVisible(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <li className="relative z-50 list-none">
        <button
          className="hover:text-red-300 dark:hover:text-red-200 font-semibold cursor-pointer
                     transition-colors duration-200 focus:outline-none flex items-center"
          onClick={() => setDropdownVisible(!dropdownVisible)}
          aria-expanded={dropdownVisible}
          aria-controls="category-dropdown-menu"
        >
          Categories{" "}
          <FontAwesomeIcon
            icon={dropdownVisible ? faChevronUp : faChevronDown}
            className="text-sm ml-1"
          />
        </button>
        {dropdownVisible && (
          <ul
            id="category-dropdown-menu"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 w-[12rem] rounded-lg shadow-xl // Genişliği artırdık (w-96'dan w-[38rem]'e)
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            border border-gray-200 dark:border-gray-700 animate-fade-in z-50
            gap-x-4 max-h-[25rem] overflow-y-auto" // İki sütunlu grid ve kaydırma eklendi
            role="menu"
          >
            {genres.length > 0 ? (
              genres.map((genre) => (
                <li key={genre.id} role="none">
                  <Link
                    to={`/genres/${genre.id}/movies`}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-red-300
                               dark:hover:bg-gray-700 dark:hover:text-red-200 font-semibold transition-colors duration-200"
                    onClick={handleLinkClick}
                    role="menuitem"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                No categories available.
              </li>
            )}
          </ul>
        )}
      </li>
    </div>
  );
};

export default CategoryDropdown;
