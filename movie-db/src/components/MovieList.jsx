import { useEffect, useState } from 'react';
import "./MovieList.css";

function MovieList () {
        const [movies, setMovies] = useState([]);
        const [search, setSearch] = useState("Inception");

        useEffect (() => {
            fetchMovies(search)
        }, [search]);

        const fetchMovies = async (title) => {
            const apiKey = "4239d443";
            const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
            const data = await response.json();

            if (data.Search ) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            };
        };

        return (

            <div className="container">
                <h2 className='heading'>Movie List</h2>
                <input
                    type='text'
                    value={search}
                    placeholder='Search movies'
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className='movie-list'>
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="card">
                            <img
                                className='image'
                                src={movie.Poster}
                                alt={movie.Title}
                                width="100" />
                            <h3 className='title'>{movie.Title}</h3>
                            <p className='year'>{movie.Year}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
}

export default MovieList;