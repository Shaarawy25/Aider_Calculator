import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    darkMode: false,
    history: [], // Calculation history state
  };

  handleClick = (buttonName) => {
    const newState = calculate(this.state, buttonName);

    // If the calculation is completed (e.g., "=" is pressed), update history
    if (buttonName === "=" && this.state.next && this.state.operation) {
      const expression = `${this.state.total || 0} ${this.state.operation} ${this.state.next}`;
      const result = newState.total;
      this.setState((prevState) => ({
        ...newState,
        history: [...prevState.history, `${expression} = ${result}`],
      }));
    } else {
      this.setState(newState);
    }
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    const { darkMode, history } = this.state;
    return (
      <div className={`component-app ${darkMode ? "dark-mode" : ""}`}>
        <div className="toggle-container">
          <button onClick={this.toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="calculator-layout">
          <div>
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          </div>
          <div className="history-panel">
            <h3>History</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
