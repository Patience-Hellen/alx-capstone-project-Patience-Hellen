import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      setSearch(query);
      fetchMovies(query);
    } else {
      fetchTrendingMovies();
    }
  }, [location.search]);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const apiKey = "4239d443";
      const currentYear = new Date().getFullYear();
      const response = await fetch(`https://www.omdbapi.com/?s=${currentYear}&y=${currentYear}&type=movie&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        const validMovies = data.Search.filter(
          (movie) => movie.Poster && movie.Poster !== "N/A" && movie.Poster.startsWith("http")
        );
        setMovies(validMovies);
      } else {
        setMovies([]);
        setError("No trending movies found.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async (title) => {
    try {
      setLoading(true);
      setError("");
      const apiKey = "4239d443";
      const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === "True") {
        const validMovies = data.Search.filter(
          (movie) => movie.Poster && movie.Poster !== "N/A" && movie.Poster.startsWith("http")
        );
        setMovies(validMovies);
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
      navigate(`/movies?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="movie-list-page">
      <header className="navbar">
        <h1 className="logo">
          Cine<span>Hub</span>
        </h1>
        <nav className="nav-links">
          <Link to="/" className="home-link">Home</Link>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
            />
            <button type="submit">Search</button>
          </form>
        </nav>
      </header>

      <main className="movie-section">
        <h2>{search ? "Search Results" : "Trending Movies"}</h2>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error-screen">{error}</p>}

        <div className="movies-container">
          {movies.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <p className="movie-title">{movie.Title}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MovieList;
