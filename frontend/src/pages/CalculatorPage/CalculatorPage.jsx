import React from "react";

const CalculatorPage = () => {
  return (
    <div>
      <h1>Calculator Page</h1>

      <form>
        <label>
          Weight:
          <input type="number" placeholder="kg" />
        </label>

        <br />

        <label>
          Height:
          <input type="number" placeholder="cm" />
        </label>

        <br />

        <label>
          Age:
          <input type="number" placeholder="years" />
        </label>

        <br />

        <button type="button">Start losing weight</button>
      </form>
    </div>
  );
};

export default CalculatorPage;
