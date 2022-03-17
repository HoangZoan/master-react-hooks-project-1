import { useState } from "react";
import Joke from "./Joke";
import Task from "./Task";
import Gallery from "./Gallery";
import Matrix from "./Matrix";

function App() {
  const [userQuery, setUserQuery] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  const updateUserQuery = (event) => {
    setUserQuery(event.target.value);
  };

  const searchQuery = () => {
    window.open(`https://goole.com/search?q=${userQuery}`);
  };

  const toggleShowGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Task />
      <hr />
      {showGallery && <Gallery />}
      <button onClick={toggleShowGallery}>
        {showGallery ? "Hide" : "Show"} Gallery
      </button>
      <hr />
      <Matrix />
    </div>
  );
}

export default App;
