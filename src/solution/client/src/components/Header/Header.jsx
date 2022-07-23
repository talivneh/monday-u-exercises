import "./Header.css";
import validateInput from "../../services/inputValidation";
import { useState } from "react";

export default function Header({ addNewItem }) {
  const [input, setInput] = useState("");

  const handleInput = (text) => {
    // setShowLoader(true);
    const textList = text.split(",");
    if (textList && textList.length > 1) {
      textList.forEach((textItem) => {
        validateInput(textItem)
          ? addNewItem(textItem)
          : handleInvalidInput(textItem);
      });
    } else {
      validateInput(text) ? addNewItem(text) : handleInvalidInput(text);
    }
    // setShowLoader(false);
  };

  const handleInvalidInput = (input) => {
    // setAlert({
    //   show: true,
    //   type: "warning",
    //   content: `${input} is invalid input. please use letters and numbers only`,
    // });
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
            handleInput(input);
            setInput("");
          }}
        >
          +{/* <i className="fas fa-plus"></i> */}
        </button>
      </div>
    </div>
  );
}
