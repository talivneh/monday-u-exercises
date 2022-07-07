import "./TodoItem.css";
import { updateStatus, removeItem, getItem } from "../../services/dataService";
import { useState } from "react";
import { useEffect } from "react";
// import { FaRegTrashAlt } from "react-icons/bs";

export default function TodoItem({ id, itemName, status, setAlert }) {
  const [isDone, setIsDone] = useState(status);
  const [leaving, setleaving] = useState(false);

  useEffect(() => {
    updateStatus(id, { status: isDone });
  }, [isDone]);

  const getInfo = () => {
    getItem(id).then((item) => {
      setAlert({ show: true, type: "info", content: item });
    });
  };

  return (
    <li id={id} className={leaving ? "leave" : ""}>
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={isDone}
        onChange={() => {
          setIsDone((prev) => !prev);
        }}
      />
      <span
        className="todo-item"
        onClick={() => {
          getInfo();
        }}
      >
        {itemName}
      </span>
      <span className="btn-container">
        <button
          className="remove-btn"
          onClick={() => {
            removeItem(id).then(setleaving(true));
          }}
        >
          X{/* <FaRegTrashAlt /> */}
        </button>
      </span>
    </li>
  );
}
