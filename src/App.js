import "./App.css";

import { useState, useEffect } from "react";

const App = () => {
  const [genres, setGenres] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres");
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list2.values);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <>{/* { genres && ()} */}</>;
};

export default App;
