import "./TodoItem.css";
import { updateStatus, deleteItem } from "../../services/dataService";
import { useState } from "react";
import { useEffect } from "react";
import { removeItem } from "../../services/dataService";
// import { FaRegTrashAlt } from "react-icons/bs";

export default function TodoItem({ id, itemName, status }) {
  const [isDone, setIsDone] = useState(status);

  useEffect(() => {
    updateStatus(id, { status: isDone });
  }, [isDone]);

  return (
    <li id={id}>
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={isDone}
        onChange={() => {
          setIsDone((prev) => !prev);
        }}
      />
      <span className="todo-item">{itemName}</span>
      <span className="btn-container">
        <button
          className="remove-btn"
          onClick={() => {
            removeItem(id);
          }}
        >
          X{/* <FaRegTrashAlt /> */}
        </button>
      </span>
    </li>
  );
}

///////////////////////////////////////////////////////

//   listItemCheckbox.addEventListener("change", async () => {
//     const relevantItem = await this.getItemHandler(item.id);
//     const updateFields = {
//       status: !relevantItem.status,
//     };
//     await this.updateStatusHandler(item.id, updateFields);
//     await this.updateTasksNum();
//   });

//   listItemText.addEventListener("click", async () => {
//     this.alert(await this.createDetails(item.id), "info");
//   });

//   listItemRemoveBtn.innerHTML = `<i class="fas fa-trash"></i>`;
//   listItemRemoveBtn.addEventListener("click", () => {
//     this.deleteItem(listItem);
//   });
