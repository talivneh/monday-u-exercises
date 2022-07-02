import "./TodoItem.css";
// import { FaRegTrashAlt } from "react-icons/bs";

export default function TodoItem({ id, itemName, status }) {
  return (
    <li id={id}>
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={status}
        onChange={() => {
          console.log("todo: change status state");
        }}
      />
      <span className="todo-item">{itemName}</span>
      <span className="btn-container">
        <button
          className="remove-btn"
          onClick={() => {
            console.log("delete");
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
