import React, { useEffect, useState } from "react";

const UserMoviesList = () => {
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    // LocalStorage'dan filmleri al
    const storedMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
    setUserMovies(storedMovies);
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-white">Your Movies</h2>
      {userMovies.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {userMovies.map((movie) => (
            <li key={movie.id} className="text-white">
              <h3 className="text-xl">{movie.title}</h3>
              <p>{movie.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">You haven't added any movies yet.</p>
      )}
    </div>
  );
};

export default UserMoviesList;
