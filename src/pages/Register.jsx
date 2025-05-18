import React, { useState } from "react";
import api from "../api/api";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      setMessage("Registration successful!");
      console.log(response.data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center md:py-24 py-22 px-16">
      <div className="w-full max-w-md rounded-xl shadow-lg p-8 border border-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us by filling the form below</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 cursor-pointer rounded-lg font-medium text-white ${
              isLoading
                ? "bg-red-700 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition duration-200`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm text-center ${
              message.includes("successful")
                ? "bg-green-900 text-green-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-red-500 hover:text-red-400"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
