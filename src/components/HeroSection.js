import { useState, useEffect } from "react";

// hero section will feature a RANDOM movie!
const HeroSection = () => {
  const [movie, setMovie] = useState(null);
  const pageState = null;

  //  use the getMovies query (same code used in Section component)
  const fetchMovies = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: "Sci-Fi", pageState: pageState }),
    });
    const responseBody = await response.json();
    const movies = responseBody.data.movies_by_genre.values;
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      {movie && (
        <div className="hero">
          <video className="hero-video" muted controls autoPlay={true} loop>
            <source src={movie.thumbnail} type="video/mp4" />
          </video>
          <div className="info-section">
            <h3 className="hero-blurb">{movie.synopsis}</h3>
            <div className="button-section">
              <div className="button play">
                <span>
                  <i className="fa-solid fa-play"></i>
                </span>
                Play
              </div>
              <div className="button more">
                <span>
                  <i className="fa-solid fa-circle-info"></i>
                </span>
                More
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
