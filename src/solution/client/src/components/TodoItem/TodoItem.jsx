import "./TodoItem.css";
import { useCallback } from "react";
import { useState } from "react";

export default function TodoItem({
  id,
  itemName,
  status,
  creationTime,
  updateItem,
  removeOneItem,
}) {
  const [info, setInfo] = useState(false);

  const onDeleteItem = useCallback(async () => {
    const item = { itemName, id, status };
    removeOneItem(item);
  }, []);

  const onUpdateItem = useCallback(async () => {
    const item = { itemName, id, status };
    try {
      await updateItem(item);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  const getItemInfo = () => {
    return (
      <div>
        <div>Status: {status == 0 ? "UnDone" : "Done"}</div>
        <div>Creation Day: {new Date(creationTime).toLocaleDateString()}</div>
      </div>
    );
  };

  return (
    <li>
      <div>
        <input
          type="checkbox"
          className="todo-item-checkbox"
          checked={status}
          onChange={onUpdateItem}
        />
        <span
          className="todo-item"
          onClick={() => {
            setInfo(!info);
          }}
        >
          {itemName}
        </span>
        <span className="btn-container">
          <button className="remove-btn" onClick={onDeleteItem}>
            X{/* <FaRegTrashAlt /> */}
          </button>
        </span>
      </div>
      <div className={`info ${info ? "show" : ""}`}>{getItemInfo()}</div>
    </li>
  );
}
