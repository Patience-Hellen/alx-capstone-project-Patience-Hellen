import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const apiKey = "4239d443";
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("Movie not found.");
      }
    } catch {
      setError("Failed to load movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-400 mt-20">Loading...</p>;
  if (error) return <p className="text-center text-gray-400 mt-20">{error}</p>;

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white px-6 py-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md shadow-lg z-50">
        <h1 className="text-2xl font-extrabold text-red-500 tracking-wider">
          Cine<span className="text-white">Hub</span>
        </h1>
        <Link to="/" className="text-gray-300 hover:text-red-400 transition">
          Home
        </Link>
      </nav>

      <div className="pt-16 max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-xl object-cover"
        />

        <div className="flex-1 space-y-3">
          <h2 className="text-4xl font-extrabold text-red-500">{movie.Title}</h2>
          <p className="text-gray-400 text-lg">({movie.Year})</p>

          <div className="mt-4 space-y-2">
            <p><span className="font-semibold text-gray-200">Genre:</span> {movie.Genre}</p>
            <p><span className="font-semibold text-gray-200">Plot:</span> {movie.Plot}</p>
            <p><span className="font-semibold text-gray-200">Cast:</span> {movie.Actors}</p>
            <p><span className="font-semibold text-gray-200">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold text-gray-200">IMDB Rating:</span> ⭐ {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
