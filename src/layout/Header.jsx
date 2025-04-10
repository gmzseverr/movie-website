import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faPowerOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { Accordion, AccordionItem } from "@heroui/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHomePage = location.pathname === "/";

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const userMenuContent = (
    <>
      <li>
        <Link
          to="/watched-movies"
          className="block px-4 py-2 hover:text-lg font-semibold"
        >
          Watched Movies
        </Link>
      </li>
      <li>
        <Link
          to="/listed-movies"
          className="block px-4 py-2 hover:text-lg font-semibold"
        >
          Listed Movies
        </Link>
      </li>
      {user?.roles.includes("ADMIN") && (
        <li>
          <Link
            to="/admin"
            className="block px-4 py-2 hover:text-lg font-semibold "
          >
            Admin Panel
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isHomePage ? "bg-transparent" : "bg-black"
      } text-white`}
    >
      <div className="flex justify-between items-center px-12 md:px-32 py-[20px]">
        <Link to="/" className="text-2xl font-bold">
          iMovie
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 items-center ">
            <li>
              <Link to="/" className="hover:text-lg font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-lg font-semibold">
                Movies
              </Link>
            </li>
            <CategoryDropdown />
            {user ? (
              <>
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="hover:text-lg font-semibold flex items-center gap-2"
                  >
                    {user.name} <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute bg-black text-white right-0 mt-2 py-2 w-48 rounded-lg shadow-lg">
                      {userMenuContent}
                    </ul>
                  )}
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-red-800 hover:text-lg font-semibold"
                  >
                    <FontAwesomeIcon icon={faPowerOff} />
                  </button>
                </li>
              </>
            ) : (
              <li className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 px-6 py-4">
          {user ? (
            <>
              <Accordion
                variant="shadow"
                className="bg-black  text-white font-bold w-full"
              >
                <AccordionItem
                  key="user-menu"
                  aria-label="User Menu"
                  title={user.name}
                  indicator=" "
                  className="bg-black text-white font-bold "
                >
                  <ul>{userMenuContent}</ul>
                  <button
                    onClick={logout}
                    className="mt-4 text-red-800  flex items-center cursor-pointer justify-self-end

                    01
                     gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      className="font-semibold hover:text-lg cursor-pointer"
                    />{" "}
                    Logout
                  </button>
                </AccordionItem>
              </Accordion>
            </>
          ) : (
            <ul className="flex w-full flex-col gap-2">
              <li>
                <Link
                  to="/login"
                  className="hover:text-xl font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-xl font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}

          {/* Main Navigation */}
          <ul className="flex flex-col w-full px-6 gap-4 mt-6">
            <li className="w-full">
              <Link
                to="/"
                className="hover:text-xl font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="hover:text-xl font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Movies
              </Link>
            </li>
            <CategoryDropdown />
          </ul>
        </div>
      )}
    </header>
  );
}
