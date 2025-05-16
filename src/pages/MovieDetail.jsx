import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import api from "../api/api";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const trailerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#trailer") {
      scrollToTrailer();
    }
  });

  const scrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(import.meta.env.VITE_REACT_APP_API);
    api
      .get(`/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white  pt-20 px-14 sm:px-8 md:px-32 md:p-32">
      {/* Mobile Title */}
      <h1 className="text-2xl font-bold mb-4 md:hidden text-center">
        {movie.title} <span className="text-gray-400">({movie.year})</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="w-full md:w-1/4">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3">
          {/* Desktop Title */}
          <h1 className="text-2xl font-bold mb-2 hidden md:block">
            {movie.title} <span className="text-gray-600">({movie.year})</span>
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">
              IMDb: {movie.imdbRating}
            </span>
            <span>{movie.duration} min</span>
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="cursor-pointer text-3xl hover:text-red-600 transition"
              onClick={scrollToTrailer}
            />
          </div>

          <p className="mb-4">{movie.description}</p>

          <div className="mb-4">
            <h2 className="font-bold mb-2">Director:</h2>
            <p>{movie.director.name}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-bold mb-2">Cast:</h2>
            <div className="flex flex-wrap gap-2">
              {movie.actors.map((actor) => (
                <Link
                  to={`/actors/${actor.id}/movies`}
                  key={actor.id}
                  className="bg-gray-200 px-2 py-1 cursor-pointer  rounded text-black"
                >
                  {actor.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold mb-2">Genres:</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Link
                  to={`/genres/${genre.id}/movies`}
                  key={genre.id}
                  className="bg-blue-100 px-2 py-1 rounded text-black cursor-pointer hover:bg-blue-200 transition"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div ref={trailerRef} className="flex justify-center items-center py-10">
        <iframe
          src={movie.trailerUrl
            .replace("watch?v=", "embed/")
            .replace("&t=", "?start=")}
          className="rounded-md aspect-video w-full h-full md:px-10 md:py-20"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
    </div>
  );
}

export default MovieDetail;
