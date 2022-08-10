import { useState, useEffect } from "react";
import Card from "./Card";

const Section = ({ genre }) => {
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre.value }),
    });
    const responseBody = await response.json();
    setMovies(responseBody.data.movies_by_genre.values);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>{genre.value}</h1>
      {movies && (
        <div className="movie-section">
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
