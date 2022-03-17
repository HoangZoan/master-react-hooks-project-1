import { useEffect, useState } from "react";

const Joke = () => {
  const [joke, setJoke] = useState({});

  useEffect(() => {
    fetch("http://localhost:3005/jokes/random")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setJoke(json);
      });
  }, []);

  const { setup, punchline } = joke;

  return (
    <div>
      <h3>Joke</h3>
      <p>{setup}</p>
      <p>{punchline}</p>
    </div>
  );
};

export default Joke;
