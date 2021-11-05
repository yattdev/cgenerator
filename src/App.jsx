import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [number, setNumber] = useState(10);
  const [list, setList] = useState(new Values("#62bf3d").all(number));

  const handleSubmit = (e) => {
    e.preventDefault();
    let nb = parseInt(number);
    try {
      let colors = new Values(color).all(nb);
      setList(colors);
      setError("");
    } catch (error) {
      if (error.name === "RangeError") {
        setError("errorNumber");
      } else {
        setError("errorColor");
      }
    }
  };
  return (
    <>
      <section className="container">
        <h3>Color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#b0b1b5"
            className={`${error === "errorColor" ? "error" : ""}`}
          />
          <input
            type="number"
            name="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`${error === "errorNumber" ? "error" : ""}`}
          />
          <button type="submit" className="btn">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor key={index} index={index} {...color} hex={color.hex} />
          );
        })}
      </section>
    </>
  );
}

export default App;
