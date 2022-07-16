import "./TodoItem.css";
import { useCallback } from "react";

export default function TodoItem({
  id,
  itemName,
  status,
  updateItem,
  removeOneItem,
}) {
  const onDeleteItem = useCallback(async () => {
    const item = { itemName, id, status };
    removeOneItem(item);
  }, []);

  const onUpdateItem = useCallback(async () => {
    const item = { itemName, id, status };
    try {
      updateItem(item);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  return (
    <li>
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={status}
        onChange={onUpdateItem}
      />
      <span
        className="todo-item"
        onClick={() => {
          console.log("show details");
        }}
      >
        {itemName}
      </span>
      <span className="btn-container">
        <button className="remove-btn" onClick={onDeleteItem}>
          X{/* <FaRegTrashAlt /> */}
        </button>
      </span>
    </li>
  );
}
