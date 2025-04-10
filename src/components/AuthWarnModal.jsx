// AuthWarnModal.js
import React from "react";

const AuthWarnModal = ({ closeModal }) => {
  return (
    <>
      {/* Blur Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 cursor-pointer"
        onClick={closeModal}
      />
      {/* Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-black w-11/12 max-w-md p-6 rounded-lg shadow-lg text-white">
        <div className="text-center">
          <p className="text-lg text-gray-400 mb-4">
            You need to log in to perform this action.
          </p>

          <div className="text-lg">
            <a
              href="/login"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Log in
            </a>
            <p className="text-xs py-3 text-gray-400">or</p>
          </div>

          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-red-500 hover:text-red-400"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthWarnModal;
