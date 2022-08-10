import { useState, useEffect } from "react";
import Card from "./Card";

const Section = ({ genre }) => {
  const [movies, setMovies] = useState(null);
  const [pageState, setPageState] = useState(null);

  const fetchMovies = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre.value, pageState: pageState }),
    });
    const responseBody = await response.json();
    setMovies(responseBody.data.movies_by_genre.values);
    setPageState(responseBody.data.movies_by_genre.pageState);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2 id={genre.value}> {genre.value}</h2>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
          <div className="more-button" onClick={fetchMovies}></div>
        </div>
      )}
    </div>
  );
};

export default Section;
