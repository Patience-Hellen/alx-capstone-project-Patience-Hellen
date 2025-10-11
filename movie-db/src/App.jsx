import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
