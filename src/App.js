import { useState } from "react";
import Joke from "./Joke";

function App() {
  const [userQuery, setUserQuery] = useState("");

  const updateUserQuery = (event) => {
    setUserQuery(event.target.value);
  };

  const searchQuery = () => {
    window.open(`https://goole.com/search?q=${userQuery}`);
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
    </div>
  );
}

export default App;
