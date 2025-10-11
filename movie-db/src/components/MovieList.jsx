import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("Inception");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies(search);
    }, [search]);

    const fetchMovies = async (title) => {
    setLoading(true);
    const apiKey = "4239d443";
    const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Search) {
        setMovies(data.Search);
    } else {
        setMovies([]);
    }

    setLoading(false);
    };

    return (
    <div className="container">
        <header className="navbar">
            <h1 className="logo">Cine Hub</h1>
            <input
                type="text"
                value={search}
                placeholder="Search movies"
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
        </header>

        <h2 className="heading">Movie List</h2>

        {loading ? (
            <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
            ) : movies.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>No movies found.</p>
            ) : (
            <div className="movie-list">
                {movies.map((movie) => (
                <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="card">
                    <img
                    className="image"
                    src={
                        movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={movie.Title}
                    />
                    <h3 className="title">{movie.Title}</h3>
                    <p className="year">{movie.Year}</p>
                </Link>
                ))}
            </div>
        )}
    </div>
    );
}

export default MovieList;
