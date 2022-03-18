import { useState } from "react";
import MATRIX_FRAMES from "./data/matrix";
import { useDynamicTransition } from "./hooks";

const minimunDelay = 10;
const minimumIncrement = 1;

function Matrix() {
  const [delay, setDelay] = useState(minimunDelay);
  const [increment, setIncrement] = useState(minimumIncrement);

  const index = useDynamicTransition({
    delay,
    increment,
    length: MATRIX_FRAMES.length,
  });

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
