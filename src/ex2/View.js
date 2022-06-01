export default class View {
  constructor(addItem, removeItem, getAllItems) {
    this.addItemHandler = addItem;
    this.deleteItemHandler = removeItem;
    this.getAllItemsHandler = getAllItems;
    this.toDoInput = document.querySelector("input");
    this.listContainer = document.querySelector("ul");
    this.alertBox = document.querySelector(".alert");
    this.alertBoxText = document.querySelector(".alert-innet-text");
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

  getElementBySelector(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  handleAddBtnClick() {
    if (this._inputText.trim()) {
      this.handleInput(this._inputText);
    } else {
      this.alert(null);
    }
    this.resetInput();
  }

  handleInput(text) {
    const textList = text.split(",");
    if (textList.length > 1) {
      textList.forEach((text) => this.validateInput(text.trim()));
    } else {
      const isValid = this.validateInput(text.trim());
      if (isValid) {
        this.handleValidInput(text.trim());
      } else {
        handleInvalidInput(text, isValid.isExists, isValid.isSpecial);
      }
    }
  }

  handleInvalidInput(input, isExists, isSpecial) {
    let alertContent;
    if (isSpecial) {
      alertContent = [
        `${input} is invalid input. please use letters and numbers only`,
        "warning",
      ];
    }
    if (isExists) {
      alertContent = [`You are trying to add ${text} again`, "warning"];
    }
    this.alert(...alertContent);
  }

  handleValidInput(input) {
    this.addNewItem(input);
  }

  validateInput(text) {
    let inValid = { isExists: false, isSpecial: false };

    const itemsList = this.getAllItemsHandler();
    const isExists = itemsList.some((item) => item.text === text);
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (isExists) {
      inValid.isExists = true;
    } else if (format.test(text)) {
      inValid.isSpecial = true;
    } else {
      return true;
    }

    return inValid;
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

    if (this.getElementBySelector("li")) {
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
