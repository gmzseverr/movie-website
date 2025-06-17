import React from "react";
import { Link } from "react-router-dom";
import AdminMovieList from "./AdminMovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminPanel() {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl pt-12 text-center font-extrabold text-red-400">
        Admin Panel
      </h1>

      {/* Placeholder for future admin navigation or quick actions */}
      <div className="text-center mb-12">
        <div className="flex justify-center space-x-6">
          {/* Add more admin navigation links or quick action buttons here if needed */}
        </div>
      </div>

      {/* Movie List Header and Add Movie Button */}
      <div className="flex justify-between items-center py-4 mb-6 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          Movie List
        </h2>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-lg
                     hover:bg-red-400 transition-colors duration-300 shadow-md transform hover:scale-105"
        >
          <span>Add Movie</span>
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </Link>
      </div>

      {/* Admin Movie List Component */}
      <AdminMovieList />
    </div>
  );
}

export default AdminPanel;
