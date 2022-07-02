import "./Header.css";
import validateInput from "../../services/inputValidation";
import { addItem } from "../../services/dataService";
import { useState } from "react";

export default function Header({ setAlert, setShowLoader }) {
  const [input, setInput] = useState("");

  const addNewItem = (text) => {
    setShowLoader(true);
    addItem(text);
    setShowLoader(false);
  };

  return (
    <div className="header-wrapper">
      <header>ToDo - Tal Livneh</header>
      <div className="input-field">
        <input
          type="text"
          placeholder="add new ToDo"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          id="add-todo"
          onClick={() => {
            validateInput(input)
              ? addNewItem(input)
              : setAlert({
                  show: true,
                  type: "warning",
                  content: "invalid-input",
                });
            setInput("");
          }}
        >
          +{/* <i className="fas fa-plus"></i> */}
        </button>
      </div>
    </div>
  );
}
