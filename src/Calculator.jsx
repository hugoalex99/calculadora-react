import React, { useState, useEffect } from "react";
import "./index.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      setHistory([...history, `${input} = ${result}`]); // salva no histórico
    } catch {
      setInput("Erro");
    }
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isNaN(e.key) || ["+", "-", "*", "/", "."].includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        calculateResult();
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.toLowerCase() === "c") {
        clearInput();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input, history]);

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        <button onClick={clearInput}>C</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("-")}>-</button>

        {[1,2,3,4,5,6,7,8,9,0].map((num) => (
          <button key={num} onClick={() => handleClick(num.toString())}>
            {num}
          </button>
        ))}

        <button onClick={() => handleClick("+")}>+</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={calculateResult}>=</button>
      </div>

      {/* Histórico */}
      <div className="history">
        <h3>Histórico</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
