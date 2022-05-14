let itemId = 0;

const addBtn = document.getElementById("add-todo");
addBtn.addEventListener("click", () => {
  insertNewToDo();
});

const toDoInput = document.querySelector("input");
const listContainer = document.querySelector("ul");

function insertNewToDo() {
  listContainer.appendChild(createNewToDoElement(toDoInput.value));
  toDoInput.value = "";
}

function createNewToDoElement(text) {
  const currentId = itemId++;

  const listItem = document.createElement("li");
  listItem.id = currentId;

  const listItemText = document.createElement("span");
  listItemText.innerText = text;

  const listItemRemoveBtnContainer = document.createElement("span");
  listItemRemoveBtnContainer.className = "btn-container";

  const listItemRemoveBtn = document.createElement("button");
  listItemRemoveBtn.className = "remove-btn";
  listItemRemoveBtn.innerText = "remove";
  listItemRemoveBtn.addEventListener("click", () => {
    deleteItem(currentId);
  });

  listItemRemoveBtnContainer.appendChild(listItemRemoveBtn);
  listItem.appendChild(listItemText);
  listItem.appendChild(listItemRemoveBtnContainer);

  return listItem;
}

function deleteItem(id) {
  console.log(id);
}
