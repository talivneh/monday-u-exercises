export default class View {
  constructor(addItemHandler, deleteItemHandler, getAllItemsHandler) {
    this.toDoInput = document.querySelector("input");
    this.listContainer = document.querySelector("ul");
    this.alertBox = document.querySelector(".alert");
    this.alertBoxText = document.querySelector(".alert-innet-text");
    this.addItemHandler = addItemHandler;
    this.deleteItemHandler = deleteItemHandler;
    this.getAllItemsHandler = getAllItemsHandler;
  }

  init() {
    const aletBoxCloseBtn = document.getElementById("alert-close-btn");
    aletBoxCloseBtn.addEventListener("click", () => {
      this.closeAlertBox();
    });

    const deleteAllBtn = document.getElementById("clear-all");
    deleteAllBtn.addEventListener("click", () => {
      this.listContainer.childNodes.forEach((item) => {
        this.deleteItem(item);
      });
    });
  }

  get _inputText() {
    return this.toDoInput.value;
  }

  resetInput() {
    this.toDoInput.value = "";
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  handleAddBtnClick() {
    if (this._inputText) {
      this.handleInput(this._inputText);
      this.resetInput();
    } else {
      this.alert(null);
    }
  }

  handleInput(text) {
    const textList = text.split(",");
    if (textList.length > 1) {
      textList.forEach((text) => this.validateInput(text.trim()));
    } else {
      this.validateInput(text.trim());
    }
  }

  validateInput(text) {
    const itemsList = this.getAllItemsHandler();
    const isExists = itemsList.some((item) => item.text === text);

    if (isExists) {
      return this.alert(`You are trying to add ${text} again`, "warning");
    }

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(text)) {
      this.addNewItem(text);
    } else {
      this.alert(
        `${text} is invalid input. please use letters and numbers only`,
        "warning"
      );
    }
  }

  addNewItem(text) {
    const time = new Date().toLocaleDateString();
    const item = {
      text,
      time,
      complete: false,
      checkTime: null,
      toggleComplete() {
        this.complete = !this.complete;
        this.checkTime = !this.checkTime
          ? new Date().toLocaleDateString()
          : null;
      },
    };

    this.addItemHandler(item).then((itemName) =>
      this.createNewToDoElement({ ...item, text: itemName })
    );
  }

  createNewToDoElement(item) {
    const listItem = document.createElement("li");

    const listItemCheckbox = document.createElement("input");
    listItemCheckbox.setAttribute("type", "checkbox");
    listItemCheckbox.className = "todo-item-checkbox";

    listItemCheckbox.addEventListener("change", () => {
      item.toggleComplete();
    });

    const listItemText = document.createElement("span");
    listItemText.className = "todo-item";
    listItemText.innerText = item.text;
    listItemText.addEventListener("click", () => {
      this.alert(this.createDetails(item), "info");
    });

    const listItemRemoveBtnContainer = document.createElement("span");
    listItemRemoveBtnContainer.className = "btn-container";

    const listItemRemoveBtn = document.createElement("button");
    listItemRemoveBtn.className = "remove-btn";
    listItemRemoveBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    listItemRemoveBtn.addEventListener("click", () => {
      this.deleteItem(listItem);
    });

    listItemRemoveBtnContainer.appendChild(listItemRemoveBtn);
    listItem.appendChild(listItemCheckbox);
    listItem.appendChild(listItemText);
    listItem.appendChild(listItemRemoveBtnContainer);

    this.listContainer.appendChild(listItem);
    this.updateTasksNum();
  }

  deleteItem(elementToDelte) {
    const container = this.listContainer;
    elementToDelte.classList.add("leave");

    const updateTasksNum = this.updateTasksNum;

    setTimeout(() => {
      container.removeChild(elementToDelte);
      updateTasksNum.call(this);
    }, 800);

    this.deleteItemHandler(elementToDelte.innerText);
  }

  updateTasksNum() {
    const footersItemsNumberSpan = document.getElementById("tasks-number");
    footersItemsNumberSpan.innerText =
      this.listContainer.childNodes.length.toString();
    this.toggleEmptyView.call(this);
  }

  toggleEmptyView() {
    const listPlaceHolder = document.querySelector(".empty-list");
    const footer = document.querySelector("footer");

    if (this.getElement("li")) {
      listPlaceHolder.classList.add("hide");
      footer.classList.remove("hide");
    } else {
      footer.classList.add("hide");
      setTimeout(() => {
        listPlaceHolder.classList.remove("hide");
      }, 100);
    }
  }

  closeAlertBox() {
    this.alertBox.classList.remove("show", "warning", "info");
  }

  createDetails(item) {
    console.log(item.complete);
    return `<span><span>To do:</span> ${item.text}</span>
    <span><span>Creation-date:</span> ${item.time}</span>
    ${
      item.complete
        ? `<span class="done"><span>Done at:</span> ` +
          item.checkTime +
          `</span>`
        : ``
    } `;
  }

  alert(alert, type) {
    if (!alert) {
      this.alertBox.classList.add("show", "warning");
      this.alertBoxText.innerText =
        "please write some text before adding new ToDo";
    } else {
      this.alertBox.classList.add("show", type);
      this.alertBoxText.innerHTML = alert;
    }
  }
}
