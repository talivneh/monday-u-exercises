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
  itemsList.forEach((object) => deleteItem(object.id));
});

const alertBox = document.querySelector(".alert");
const alertBoxText = document.querySelector(".alert-innet-text");
const aletBoxCloseBtn = document.getElementById("alert-close-btn");
aletBoxCloseBtn.addEventListener("click", () => {
  closeAlertBox();
});

const listPlaceHolder = document.querySelector(".empty-list");

const updateTasksNum = () => {
  footersItemsNumberSpan.innerText = itemsList.length.toString();
  if (itemsList.length) {
    deleteAllBtn.classList.remove("no-tasks");
    listPlaceHolder.classList.add("hide");
  } else {
    deleteAllBtn.classList.add("no-tasks");
    setTimeout(() => {
      listPlaceHolder.classList.remove("hide");
    }, 900);
  }
};

updateTasksNum();

function createNewToDo() {
  if (toDoInput.value.length) {
    const currentId = itemId++;
    listContainer.appendChild(createNewToDoElement(toDoInput.value, currentId));
    itemsList.push({ id: currentId, text: toDoInput.value, time: new Date() });
    toDoInput.value = "";
    updateTasksNum();
  } else {
    alertBox.classList.add("show", "warning");
    alertBoxText.innerText = "please write some text before adding new ToDo";
  }
}

function createNewToDoElement(text, id) {
  const listItem = document.createElement("li");
  listItem.id = id;

  const listItemCheckbox = document.createElement("input");
  listItemCheckbox.setAttribute("type", "checkbox");
  listItemCheckbox.className = "todo-item-checkbox";
  listItemCheckbox.addEventListener("change", (e) => {
    const item = itemsList.find((listItem) => listItem.id === id);
    if (e.target.checked) {
      item.isDone = true;
      item.checkTime = new Date();
    } else {
      item.isDone = false;
      item.checkTime = "";
    }
  });

  const listItemText = document.createElement("span");
  listItemText.className = "todo-item";
  listItemText.innerText = text;
  listItemText.addEventListener("click", () => {
    alertBox.classList.add("show", "info");
    alertBoxText.innerHTML = createDetails(id);
  });

  const listItemRemoveBtnContainer = document.createElement("span");
  listItemRemoveBtnContainer.className = "btn-container";

  const listItemRemoveBtn = document.createElement("button");
  listItemRemoveBtn.className = "remove-btn";
  listItemRemoveBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  listItemRemoveBtn.addEventListener("click", () => {
    deleteItem(id);
  });

  listItemRemoveBtnContainer.appendChild(listItemRemoveBtn);
  listItem.appendChild(listItemCheckbox);
  listItem.appendChild(listItemText);
  listItem.appendChild(listItemRemoveBtnContainer);

  return listItem;
}

function deleteItem(id) {
  const elementToDelte = document.getElementById(id);
  elementToDelte.classList.add("leave");
  setTimeout(() => {
    listContainer.removeChild(elementToDelte);
  }, 800);
  itemsList = itemsList.filter((listId) => listId.id !== id);
  updateTasksNum();
}

function closeAlertBox() {
  alertBox.classList.remove("show", "warning", "info");
}

function createDetails(iitemId) {
  const item = itemsList.find((listItem) => listItem.id === iitemId);
  return `<span><span>To do:</span> ${item.text}</span>
  <span><span>Creation-date:</span> ${item.time.getDate()}.${
    item.time.getMonth() + 1
  }.${item.time.getFullYear()}</span>
        ${
          item.isDone
            ? `<span class="done"><span>Done at:</span> ` +
              item.checkTime.getDate() +
              `.` +
              (item.checkTime.getMonth() + 1) +
              `.` +
              item.checkTime.getFullYear() +
              `</span>`
            : ``
        }
        `;
}
