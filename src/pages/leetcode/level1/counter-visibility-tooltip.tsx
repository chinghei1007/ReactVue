import { useState, useEffect } from "react";
import "./counter-visibility-tooltip.css";
import Tooltip from "../../../customElements/Tooltip";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);
  const [opacity, setOpacity] = useState<number>(100);

  const increment = () => setCount((c) => c + rate);
  const decrement = () => setCount((c) => c - rate);

  useEffect(() => {
    // Rate persistence
    const storedRate = localStorage.getItem("counterRate");
    if (storedRate) {
      setRate(Number(storedRate));
    } else {
      localStorage.setItem("counterRate", "1");
    }

    // Opacity persistence
    const storedOpacity = localStorage.getItem("counterOpacity");
    if (storedOpacity) {
      setOpacity(Number(storedOpacity));
    } else {
      localStorage.setItem("counterOpacity", "100"); // default full opacity
    }
  }, []);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/^0+/, "").split(".")[0];
    const num = value === "" ? 0 : Number(value);

    setRate(num);
    localStorage.setItem("counterRate", String(num));
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = Number(e.target.value);
    setOpacity(newOpacity);
    localStorage.setItem("counterOpacity", String(newOpacity)); // persist
  };

  return (
    <div>
    <section className={`counter-container ${opacity < 10 ? "low-opacity" : ""}`}>
      <h1 className="counter-heading">Counter</h1>

      <div
        className="counter-box"
        style={{ opacity: opacity / 100, pointerEvents: opacity > 10 ? "auto" : "none", cursor: opacity > 10 ? "default" : "not-allowed" }}
      >
        <h2 className="counter-value">Value: {count}</h2>

        <div className="counter-controls">
          <button className="counter-btn decrement" onClick={decrement}>
            - Decrement
          </button>
          <button className="counter-btn increment" onClick={increment}>
            + Increment
          </button>
        </div>

        <div className="counter-rate">
          <label>
            Step size:{" "}
            <input
              type="number"
              value={rate}
              onChange={handleRateChange}
              className="rate-input"
            />
          </label>
        </div>
      </div>

      <div className="counter-opacity">
        <label>
          Opacity: {opacity}%
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={handleOpacityChange}
            className="opacity-slider"
          />
        </label>
      </div>

      <Tooltip className="question-tooltip" label="Hover Over Me">
        This is a test tooltip with custom element
      </Tooltip>
    </section>
    </div>
  );
}
