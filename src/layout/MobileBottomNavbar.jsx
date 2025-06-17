// src/layout/MobileBottomNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFilm,
  faList,
  faUser,
  faRightToBracket,
  faPowerOff,
  faSun,
  faMoon,
  faXmark, // Bu hala burada kalmalı, MobileCategoryPanel için kapatma butonu
} from "@fortawesome/free-solid-svg-icons";
// import CategoryDropdown from "../components/CategoryDropdown.jsx"; // ARTIK İHTİYAÇ YOK
import MobileCategoryPanel from "../components/MobileCategoryPanel.jsx"; // YENİ BİLEŞENİ İMPORT ET
import { useAuth } from "../context/AuthContext";

const MobileBottomNavbar = ({ toggleTheme, theme }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showCategoryPanel, setShowCategoryPanel] = useState(false); // Adını değiştirdim: showCategoryDropdown -> showCategoryPanel
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // const categoryDropdownRef = useRef(null); // ARTIK İHTİYAÇ YOK
  const userDropdownRef = useRef(null);

  useEffect(() => {
    // Panel veya kullanıcı menüsü açıldığında diğerini kapat
    if (showCategoryPanel) setShowUserDropdown(false);
    if (showUserDropdown) setShowCategoryPanel(false);
  }, [showCategoryPanel, showUserDropdown]);

  // Mobil navigasyon öğelerinin dışına tıklanınca kapatma mantığı
  useEffect(() => {
    function handleClickOutside(event) {
      // Eğer kullanıcı açılır menüsü açıksa ve tıklama dışarıdaysa kapat
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
      // MobileCategoryPanel kendi kapatma mantığını handle ettiği için burada category panel için ref'e gerek kalmadı.
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const closeAllPanelsAndDropdowns = () => {
    // Fonksiyon adını güncelledim
    setShowCategoryPanel(false);
    setShowUserDropdown(false);
  };

  const handleLogout = () => {
    logout();
    closeAllPanelsAndDropdowns();
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900
                   border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 py-2
                   md:hidden"
      >
        <ul className="flex justify-around items-center h-full text-sm font-semibold">
          <li>
            <Link
              to="/"
              className={`flex flex-col items-center p-1 transition-colors duration-200
                          ${
                            location.pathname === "/"
                              ? "text-red-400"
                              : "text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                          }`}
              onClick={closeAllPanelsAndDropdowns}
            >
              <FontAwesomeIcon icon={faHome} className="text-xl mb-1" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className={`flex flex-col items-center p-1 transition-colors duration-200
                          ${
                            location.pathname === "/movies"
                              ? "text-red-400"
                              : "text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                          }`}
              onClick={closeAllPanelsAndDropdowns}
            >
              <FontAwesomeIcon icon={faFilm} className="text-xl mb-1" />
              <span>Movies</span>
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setShowCategoryPanel(!showCategoryPanel)} // State adını kullandık
              className={`flex flex-col items-center p-1 transition-colors duration-200 focus:outline-none
                          ${
                            showCategoryPanel ||
                            location.pathname.startsWith("/genres")
                              ? "text-red-400"
                              : "text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                          }`}
              aria-expanded={showCategoryPanel}
              aria-controls="mobile-categories-panel"
            >
              <FontAwesomeIcon icon={faList} className="text-xl mb-1" />
              <span>Categories</span>
            </button>
          </li>
          {user ? (
            <li className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex flex-col items-center p-1 transition-colors duration-200 focus:outline-none
                            ${
                              showUserDropdown
                                ? "text-red-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                            }`}
                aria-expanded={showUserDropdown}
                aria-controls="mobile-user-menu-panel"
              >
                <FontAwesomeIcon icon={faUser} className="text-xl mb-1" />
                <span>{user.name.split(" ")[0]}</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`flex flex-col items-center p-1 transition-colors duration-200
                              ${
                                location.pathname === "/login"
                                  ? "text-red-400"
                                  : "text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                              }`}
                  onClick={closeAllPanelsAndDropdowns}
                >
                  <FontAwesomeIcon
                    icon={faRightToBracket}
                    className="text-xl mb-1"
                  />
                  <span>Login</span>
                </Link>
              </li>
              {/* Tema Değiştirme Butonu */}
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex flex-col items-center p-1 transition-colors duration-200
                             text-gray-600 dark:text-gray-400 hover:text-red-300 dark:hover:text-red-200"
                  title={
                    theme === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"
                  }
                  aria-label="Toggle Theme"
                >
                  <FontAwesomeIcon
                    icon={theme === "dark" ? faSun : faMoon}
                    className="text-xl mb-1"
                  />
                  <span>Theme</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Categories Panel Overlay - MobileCategoryPanel'i burada render ediyoruz */}
      {showCategoryPanel && (
        <MobileCategoryPanel onClose={() => setShowCategoryPanel(false)} />
      )}

      {/* User Dropdown Overlay (Aynı kaldı) */}
      {showUserDropdown && user && (
        <div
          ref={userDropdownRef}
          className="fixed bottom-0 left-0 w-full h-[calc(100%-80px)] overflow-y-auto
                     bg-white dark:bg-gray-900 shadow-lg z-40 py-4 px-6 animate-slide-in-up"
          style={{ bottom: "60px" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Hello, {user.name.split(" ")[0]}!
            </h2>
            <button
              onClick={() => setShowUserDropdown(false)}
              className="text-3xl text-red-400 focus:outline-none"
              aria-label="Close user menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/watched-movies"
                className="block py-2 text-lg font-bold hover:text-red-300 dark:hover:text-red-200 transition-colors duration-200"
                onClick={closeAllPanelsAndDropdowns}
              >
                Watched Movies
              </Link>
            </li>
            <li>
              <Link
                to="/listed-movies"
                className="block py-2 text-lg font-bold hover:text-red-300 dark:hover:text-red-200 transition-colors duration-200"
                onClick={closeAllPanelsAndDropdowns}
              >
                My Lists
              </Link>
            </li>
            {user?.roles.includes("ADMIN") && (
              <li>
                <Link
                  to="/admin"
                  className="block py-2 text-lg font-bold hover:text-red-300 dark:hover:text-red-200 transition-colors duration-200"
                  onClick={closeAllPanelsAndDropdowns}
                >
                  Admin Panel
                </Link>
              </li>
            )}
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2 text-lg font-semibold transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileBottomNavbar;
