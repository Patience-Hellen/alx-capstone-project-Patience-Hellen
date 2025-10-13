import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "Inception";
    setSearch(query);
    fetchMovies(query);
  }, [location.search]);

  const fetchMovies = async (title) => {
    try {
      setLoading(true);
      setError("");
      const apiKey = "4239d443";
      const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found. Try searching for something else.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchMovies(search);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-lg">
        <h1 className="text-2xl font-extrabold text-red-500 tracking-wider">
          Cine<span className="text-white">Hub</span>
        </h1>
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-red-400 transition">Home</Link>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={search}
              placeholder="Search movies..."
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-48 md:w-64 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-r-md font-semibold transition"
            >
              Search
            </button>
          </form>
        </nav>
      </header>

      {/* Movie List Section */}
      <main className="pt-28 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-red-400 mb-6 border-l-4 border-red-600 pl-3">
          Search Results
        </h2>

        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-gray-400">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.imdbID}
              to={`/movie/${movie.imdbID}`}
              className="relative group overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center">
                <h3 className="font-bold text-white px-2">{movie.Title}</h3>
                <p className="text-gray-300 text-sm">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MovieList;
