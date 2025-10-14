import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovieDetails.css";

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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="details-page">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">
          Cine<span>Hub</span>
        </h1>
        <div className="nav-links">
          <Link to="/" className="home-link">Home</Link>
        </div>
      </nav>

      {/* Back Link */}
      <div className="back-link-container">
        <Link to="/movies" className="back-link">← Back to Movies</Link>
      </div>

      {/* Main Content */}
      <div className="details-container">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="details-poster"
        />

        <div className="details-content">
          <h2 className="details-title">{movie.Title}</h2>
          <p className="details-year">({movie.Year})</p>

          <div className="details-info">
            <p><span>Genre:</span> {movie.Genre}</p>
            <p><span>Plot:</span> {movie.Plot}</p>
            <p><span>Cast:</span> {movie.Actors}</p>
            <p><span>Director:</span> {movie.Director}</p>
            <p><span>IMDB Rating:</span> ⭐ {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
