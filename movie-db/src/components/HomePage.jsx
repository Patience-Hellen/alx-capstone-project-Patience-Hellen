import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetchMarvelMovies();
  }, []);

  const fetchMarvelMovies = async (query = "Marvel") => {
    const apiKey = "4239d443";
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Search) {
        const moviesWithPosters = data.Search.filter(movie => {
          const poster = movie.Poster?.trim();
          return poster && poster !== "N/A" && poster.startsWith("http");
        });
        setMovies(moviesWithPosters);
      }
    } catch (error) {
      console.error("Error fetching Marvel movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/movies?search=${encodeURIComponent(searchTerm)}`);
  }
};


  return (
    <div className="homepage">
      <nav className="navbar">
        <h1 className="logo">
          Cine<span>Hub</span>
        </h1>
        <div className="nav-links">
          <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  <button type="submit">Search</button>
</form>

        </div>
      </nav>

      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>Welcome to CineHub</h2>
          <p>
            Explore, discover, and fall in love with your favorite stories — from timeless classics to the latest blockbusters.
          </p>
          <Link to="/movies" className="btn">
            Explore Movies
          </Link>
        </div>
      </section>

      <section className="recommended">
        <h3>Recommended: Marvel Picks</h3>

        {loading ? (
          <p className="loading">Loading recommendations...</p>
        ) : (
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.Title}
                />
                <p>{movie.Title}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
