import { useEffect, useState } from "react";
import MATRIX_FRAMES from "./data/matrix";

const minimunDelay = 10;
const minimumIncrement = 1;

function Matrix() {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(minimunDelay);
  const [increment, setIncrement] = useState(minimumIncrement);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(
        (storedIndex) => (storedIndex + increment) % MATRIX_FRAMES.length
      );
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [delay, increment]);

  const updateDelay = (event) => {
    const delay = Number(event.target.value);

    setDelay(delay < minimunDelay ? minimunDelay : delay);
  };

  const updateIncrement = (event) => {
    const increment = Number(event.target.value);

    setIncrement(increment < minimumIncrement ? minimumIncrement : increment);
  };

  return (
    <div className="Matrix">
      <img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
      <div className="multiform">
        <div>
          Frame transition delay (seconds):
          <input type="number" onChange={updateDelay} />
        </div>
        <div>
          Frame increment:
          <input type="number" onChange={updateIncrement} />
        </div>
      </div>
    </div>
  );
}

export default Matrix;
