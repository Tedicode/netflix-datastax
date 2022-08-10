import "./App.css";
import { useState, useEffect } from "react";
import Section from "./components/Section";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";

const App = () => {
  const [genres, setGenres] = useState(null);
  const genreIncrement = 4;
  const [limit, setLimit] = useState(genreIncrement);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    });
    // this will specify method is POST, and a body with the LIMIT
    // that we want to pass through the event to this serverless function
    // we'll get the limit from the local state, and add 4 to it
    // also, the limit gets set on local state, each time this function runs
    // At first it's initialized to 4 (with useState) above.
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list2.values);
  };

  useEffect(() => {
    fetchData();
  }, [, limit]);

  return (
    <>
      <NavBar />
      <HeroSection />

      <div className="container">
        {genres &&
          genres.map((genre, index) => <Section key={index} genre={genre} />)}
      </div>

      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement);
        }}
      />
    </>
  );
};

export default App;
