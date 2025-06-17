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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-[#F8F8F8] dark:text-white text-[#333333]">
        Yükleniyor...
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-[#F8F8F8] dark:text-white text-[#333333]">
        Film bulunamadı.
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen dark:bg-gray-900 dark:text-white bg-[#F8F8F8] text-[#333333] pt-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 transition-colors duration-300">
      {/* Mobile Title */}
      <h1 className="text-3xl font-extrabold mb-6 md:hidden text-center pt-8">
        {movie.title}{" "}
        <span className="dark:text-gray-400 text-gray-500">({movie.year})</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center md:items-start pt-8 pb-12">
        {/* Poster */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-xl shadow-2xl w-full h-auto object-cover max-w-sm mx-auto md:max-w-none"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          {/* Desktop Title */}
          <h1 className="text-4xl font-extrabold mb-4 hidden md:block">
            {movie.title}{" "}
            <span className="dark:text-gray-500 text-gray-600 font-bold">
              ({movie.year})
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-lg">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-md">
              IMDb: {movie.imdbRating}
            </span>
            <span className="dark:text-gray-300 text-gray-700">
              {movie.duration} dk
            </span>
            <FontAwesomeIcon
              icon={faCirclePlay}
              className="cursor-pointer text-5xl dark:text-red-500 text-[#FF6347] hover:dark:text-red-600 hover:text-[#E0523A] transition transform hover:scale-110"
              onClick={scrollToTrailer}
              title="Fragmanı Oynat"
            />
          </div>

          <p className="mb-6 text-lg leading-relaxed dark:text-gray-200 text-gray-700">
            {movie.description}
          </p>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2 dark:text-gray-100 text-[#333333]">
              Yönetmen:
            </h2>
            <p className="dark:text-gray-300 text-gray-700">
              {movie.director.name}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2 dark:text-gray-100 text-[#333333]">
              Oyuncular:
            </h2>
            <div className="flex flex-wrap gap-3">
              {movie.actors.map((actor) => (
                <Link
                  to={`/actors/${actor.id}/movies`}
                  key={actor.id}
                  className="dark:bg-gray-700 dark:text-white bg-gray-200 text-[#333333] px-3 py-1 rounded-full text-sm hover:dark:bg-gray-600 hover:bg-gray-300 transition shadow-sm"
                >
                  {actor.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2 dark:text-gray-100 text-[#333333]">
              Türler:
            </h2>
            <div className="flex flex-wrap gap-3">
              {movie.genres.map((genre) => (
                <Link
                  to={`/genres/${genre.id}/movies`}
                  key={genre.id}
                  className="dark:bg-blue-800 dark:text-white bg-blue-100 text-[#333333] px-3 py-1 rounded-full text-sm hover:dark:bg-blue-700 hover:bg-blue-200 transition shadow-sm"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={trailerRef}
        className="flex justify-center items-center py-10 px-4 md:px-0"
      >
        <iframe
          src={movie.trailerUrl
            .replace("watch?v=", "embed/")
            .replace("&t=", "?start=")}
          className="rounded-lg aspect-video w-full max-w-4xl h-auto shadow-xl border-4 dark:border-gray-700 border-gray-200"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
        ></iframe>
      </div>
    </div>
  );
}

export default MovieDetail;
