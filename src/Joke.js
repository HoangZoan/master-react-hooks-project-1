import { useFetch } from "./hooks";

const Joke = () => {
  const { setup, punchline } = useFetch(
    "http://localhost:3005/jokes/random",
    {}
  );

  return (
    <div>
      <h3>Joke</h3>
      <p>{setup}</p>
      <p>
        <em>{punchline}</em>
      </p>
    </div>
  );
};

export default Joke;
