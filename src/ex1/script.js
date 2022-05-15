let itemsList = [];
let itemId = 0;

const addNewToDoBtn = document.getElementById("add-todo");
addNewToDoBtn.addEventListener("click", () => {
  createNewToDo();
});

const toDoInput = document.querySelector("input");
const listContainer = document.querySelector("ul");
const footersItemsNumberSpan = document.getElementById("tasks-number");
const deleteAllBtn = document.getElementById("clear-all");
deleteAllBtn.addEventListener("click", () => {
  itemsList.forEach((id) => deleteItem(id));
});

const alertBox = document.querySelector(".alert");
const alertBoxText = document.querySelector(".alert-innet-text");
const aletBoxCloseBtn = document.getElementById("alert-close-btn");
aletBoxCloseBtn.addEventListener("click", () => {
  closeAlertBox();
});

const updateTasksNum = () => {
  footersItemsNumberSpan.innerText = itemsList.length.toString();
  itemsList.length
    ? deleteAllBtn.classList.remove("no-tasks")
    : deleteAllBtn.classList.add("no-tasks");
};

updateTasksNum();

function createNewToDo() {
  if (toDoInput.value.length) {
    const currentId = itemId++;
    listContainer.appendChild(createNewToDoElement(toDoInput.value, currentId));
    toDoInput.value = "";

    itemsList.push(currentId);
    updateTasksNum();
  } else {
    alertBox.classList.add("show");
    alertBoxText.innerText = "please write some text before adding new ToDo";
  }
}

function createNewToDoElement(text, id) {
  const listItem = document.createElement("li");
  listItem.id = id;

  const listItemText = document.createElement("span");
  listItemText.className = "todo-item";
  listItemText.innerText = text;
  listItemText.addEventListener("click", () => {
    alertBox.classList.add("show");
    alertBoxText.innerText = text;
  });

  const listItemRemoveBtnContainer = document.createElement("span");
  listItemRemoveBtnContainer.className = "btn-container";

  const listItemRemoveBtn = document.createElement("button");
  listItemRemoveBtn.className = "remove-btn";
  listItemRemoveBtn.innerText = "remove";
  listItemRemoveBtn.addEventListener("click", () => {
    deleteItem(id);
  });

  listItemRemoveBtnContainer.appendChild(listItemRemoveBtn);
  listItem.appendChild(listItemText);
  listItem.appendChild(listItemRemoveBtnContainer);

  return listItem;
}

function deleteItem(id) {
  const elementToDelte = document.getElementById(id);
  listContainer.removeChild(elementToDelte);
  itemsList = itemsList.filter((listId) => listId !== id);
  updateTasksNum();
}

function closeAlertBox() {
  alertBox.classList.remove("show");
}
