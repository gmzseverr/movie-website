import React from "react";
import { Link } from "react-router-dom";
import AdminMovieList from "./AdminMovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminPanel() {
  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white pt-20 px-16 md:px-32">
      <h1 className="text-5xl mb-8 text-center font-bold text-red-800">
        Admin Panel
      </h1>

      <div className="text-center mb-12">
        <div className="flex justify-center space-x-6"></div>
      </div>

      <div className="flex justify-between py- ">
        <h1 className="text-2xl font-bold ">Movie List</h1>
        <div className="gap-3 hover:font-extrabold hover:text-2xl cursor-pointe  hover:text-red-600 px-2 text-lg  ">
          <Link
            to="/admin/add"
            className="text-red-800 font-semibold text-md  transition-colors duration-300 "
          >
            Add Movie
          </Link>
          <FontAwesomeIcon
            icon={faPlus}
            className="text-red-800 font-semibold px-2 text-md"
          />
        </div>
      </div>
      <AdminMovieList />
    </div>
  );
}

export default AdminPanel;
