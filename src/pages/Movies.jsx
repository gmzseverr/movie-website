import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Spinner } from "@heroui/react";

export default function Movies({ isAuthenticated }) {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        if (id) {
          const response = await axios.get(
            `http://localhost:8080/genres/${id}/movies`
          );
          setMovies(response.data.movies);
          setGenreName(response.data.name);
        } else {
          const response = await axios.get("http://localhost:8080/movies");
          setMovies(response.data);
          setGenreName("All");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white pt-20 px-16 md:px-32">
      <div className="flex justify-between md:flex-row gap-4 flex-col items-center py-22">
        <h1 className="md:text-3xl text-xl font-bold">{genreName} Movies</h1>
        <div className="flex text-sm gap-2">
          <button className="bg-[#F13030] text-white px-4 py-2 rounded hover:bg-[#5A0001] transition-colors">
            Sort by Year
          </button>
          <button className="bg-[#F13030] text-white px-4 py-2 rounded hover:bg-[#5A0001] transition-colors">
            Sort by Rating
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner
          classNames={{ label: "text-foreground mt-4 text-red-600" }}
          label="loading"
          variant="wave"
        />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : movies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No movies found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
