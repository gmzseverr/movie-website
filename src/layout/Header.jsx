import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPowerOff,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import MobileBottomNavbar from "./MobileBottomNavbar";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const desktopUserDropdownRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isHomePage = location.pathname === "/";

  const toggleDesktopUserDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopUserDropdownRef.current &&
        !desktopUserDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const userMenuContent = (
    <>
      <li>
        <Link
          to="/watched-movies"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 font-semibold transition-colors duration-200"
        >
          Watched Movies
        </Link>
      </li>
      <li>
        <Link
          to="/listed-movies"
          className="block px-4 py-2 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 font-semibold transition-colors duration-200"
        >
          My Lists
        </Link>
      </li>
      {user?.roles.includes("ADMIN") && (
        <li>
          <Link
            to="/admin"
            className="block px-4 py-2 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400 font-semibold transition-colors duration-200"
          >
            Admin Panel
          </Link>
        </li>
      )}
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300
          ${
            isHomePage
              ? "bg-transparent"
              : "bg-white dark:bg-gray-900 shadow-md"
          }
          ${
            isHomePage
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-900 dark:text-gray-100"
          }
        `}
      >
        <div className="flex justify-between items-center px-6 sm:px-12 md:px-16 lg:px-24 py-4 md:py-5">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold  hover:text-red-500 text-red-400 dark:hover:text-red-300 transition-colors duration-300"
          >
            iMovie
          </Link>

          {/* Desktop Nav (md+) */}
          <nav className="hidden md:flex gap-x-10 items-center text-lg font-semibold text-gray-600 dark:text-gray-400">
            <Link
              to="/"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              Movies
            </Link>
            <CategoryDropdown isMobile={false} />

            {user ? (
              <div className="relative" ref={desktopUserDropdownRef}>
                <button
                  onClick={toggleDesktopUserDropdown}
                  className="flex items-center gap-1 text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 focus:outline-none transition-colors duration-200"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {user.name}
                  <FontAwesomeIcon
                    icon={dropdownOpen ? faChevronUp : faChevronDown}
                    className="ml-1 text-sm"
                  />
                </button>
                {dropdownOpen && (
                  <ul
                    className="absolute right-0 mt-2 py-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 animate-fade-in"
                    role="menu"
                  >
                    {userMenuContent}
                    <li role="none">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 font-semibold  hover:text-red-500text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                        role="menuitem"
                      >
                        <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex gap-6">
                <Link
                  to="/login"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              className="text-xl text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 focus:outline-none"
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>

            {/* Mobile Bottom Navbar */}
            <MobileBottomNavbar
              user={user}
              logout={logout}
              toggleTheme={toggleTheme}
              theme={theme}
            />
          </div>
        </div>
      </header>
    </>
  );
}
