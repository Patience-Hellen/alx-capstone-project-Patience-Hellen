import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
    const apiKey = "4239d443";
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    const data = await response.json();
    setMovie(data);
    setLoading(false);
    };

    if (loading) return <p className="text-center text-white mt-20">Loading...</p>;
    if (!movie) return <p className="text-center text-white mt-20">Movie not found</p>;

    return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-10">
        <div className="w-full max-w-5xl flex flex-col gap-6">
            <Link to="/" className="text-yellow-400 hover:underline">← Back to Movie List</Link>

            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={
                    movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                className="w-full md:w-1/3 rounded-lg"
                />

                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">
                        {movie.Title} <span className="text-gray-400">({movie.Year})</span>
                    </h2>

                    <p><span className="font-semibold text-gray-300">Genre:</span> {movie.Genre}</p>
                    <p><span className="font-semibold text-gray-300">Plot:</span> {movie.Plot}</p>
                    <p><span className="font-semibold text-gray-300">Cast:</span> {movie.Actors}</p>
                    <p><span className="font-semibold text-gray-300">Director:</span> {movie.Director}</p>
                    <p><span className="font-semibold text-gray-300">IMDB Rating:</span> ⭐ {movie.imdbRating}</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MovieDetails;
