import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setmovies] = useState([]);

  return (
    <>
    <div>
      < MovieList />
    </div>
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 My Movie Database</h1>
      <p>Welcome! Soon you'll see movie data fetched from an API here.</p>
    </div>
    </>
  )
}

export default App
