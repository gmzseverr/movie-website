import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import MovieCarousel from "./MovieCarousel";
import { Link } from "react-router-dom";
import api from "../api/api";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    api
      .get("/movies")
      .then((res) => {
        const filteredMovies = res.data.filter(
          (movie) => movie.logoUrl && movie.logoUrl.trim() !== ""
        );
        setMovies(filteredMovies);
        setActiveMovie(filteredMovies[0]);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);

  const handleMovieChange = (movie) => {
    setActiveMovie(movie);
  };

  if (!activeMovie)
    return <div className="text-center text-white">Yükleniyor...</div>;

  return (
    <div className="w-full">
      <div
        className="relative  w-full min-h-screen px-4 md:px-[100px] flex items-center bg-cover bg-center overflow-hidden transition-all duration-500 text-white"
        style={{
          backgroundImage: `url(${activeMovie.wallpaperUrl})`,
        }}
      >
        {/* arka plan karartma */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="flex flex-col pt-20 md:flex-row-reverse justify-between items-center gap-6 w-full z-10">
          {/* Carousel */}
          <div className="w-full  px-5 md:pl-20 md:w-1/2">
            <MovieCarousel
              movies={movies}
              onMovieChange={handleMovieChange}
              activeMovie={activeMovie}
            />
          </div>

          {/* Açıklama + Butonlar */}
          <div className="relative flex z-10 w-full px-5  md:w-1/2 transition-all duration-500 scale-100">
            <div className="flex flex-col gap-6">
              {activeMovie.logoUrl ? (
                <img
                  src={activeMovie.logoUrl}
                  alt={`${activeMovie.title} logo`}
                  className="w-[200px] md:w-[300px]"
                />
              ) : (
                <h2 className="text-3xl md:text-5xl font-bold">
                  {activeMovie.title}
                </h2>
              )}

              <h4 className="flex flex-wrap gap-4 items-center text-sm md:text-base font-medium">
                <span>{activeMovie.year}</span>
                <span className="italic">{activeMovie.ageLimit}</span>
                <span>{activeMovie.duration} min</span>
                <span>
                  {activeMovie.genres?.map((g) => g.name).join(" | ")}
                </span>
              </h4>

              <p className="max-w-xl text-sm md:text-base opacity-90">
                {activeMovie.description}
              </p>

              <div className="flex gap-4">
                <button className=" text-white  py-2  rounded  transition">
                  <Link
                    to={`/movies/${activeMovie.id}#trailer`}
                    className="hover:text-shadow-lg hover:text-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Trailer{" "}
                  </Link>
                </button>

                <button className=" text-white px-4 py-2  rounded  transition">
                  <Link
                    to={`/movies/${activeMovie.id}`}
                    className="hover:text-shadow-lg hover:text-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faEye} className="px-1" />
                    View Details
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
