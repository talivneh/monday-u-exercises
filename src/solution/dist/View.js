import { validateInput } from "./services/input-validation-service.js";

export default class View {
  constructor(itemClient) {
    this.addItemHandler = itemClient.addItem;
    this.getItemHandler = itemClient.getItem;
    this.updateCompleteHandler = itemClient.updateComplete;
    this.deleteItemHandler = itemClient.removeItem;
    this.deleteAllItemsHandler = itemClient.removeAllItems;
    this.getAllItemsHandler = itemClient.getAllItems;
    this.toDoInput = document.querySelector("input");
    this.listContainer = document.querySelector("ul");
    this.alertBox = document.querySelector(".alert");
    this.alertBoxText = document.querySelector(".alert-innet-text");
    this.loader = document.querySelector(".loader");
  }

  init() {
    const aletBoxCloseBtn = document.getElementById("alert-close-btn");
    aletBoxCloseBtn.addEventListener("click", () => {
      this.closeAlertBox();
    });

    const deleteAllBtn = document.getElementById("clear-all");
    deleteAllBtn.addEventListener("click", async () => {
      this.toggleLoader();
      const items = await this.deleteAllItemsHandler();
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        this.deleteEffect(element);
      });
      this.toggleLoader();
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

  async handleInput(text) {
    const textList = text.split(",");
    if (textList && textList.length > 1) {
      textList.forEach(async (textInput) => {
        await this.validate(textInput);
      });
    } else {
      await this.validate(text);
    }
  }

  async validate(text) {
    const isValid = await validateInput(text.trim());
    if (isValid) {
      this.handleValidInput(text.trim());
    } else {
      this.handleInvalidInput(text);
    }
  }

  handleInvalidInput(input) {
    let alertContent;
    alertContent = [
      `${input} is invalid input. please use letters and numbers only`,
      "warning",
    ];
    this.alert(...alertContent);
  }

  handleValidInput(input) {
    this.addNewItem(input);
  }

  async addNewItem(text) {
    this.toggleLoader();
    const item = await this.addItemHandler(text);
    this.toggleLoader();
    if (!item.error) {
      this.renderItems([item]);
    } else {
      this.alert(item.error, "warning");
    }
  }

  async renderItems(items) {
    if (items && items.length) {
      items.forEach((item) => this.createNewToDoElement(item));
    }
    this.updateTasksNum();
  }

  createNewToDoElement(item) {
    const listItem = document.createElement("li");
    listItem.id = item.id;

    const listItemCheckbox = document.createElement("input");
    listItemCheckbox.checked = item.complete;
    listItemCheckbox.setAttribute("type", "checkbox");
    listItemCheckbox.className = "todo-item-checkbox";

    listItemCheckbox.addEventListener("change", async () => {
      const relevantItem = await this.getItemHandler(item.id);
      const updateFields = {
        complete: !relevantItem.complete,
        checkTime: relevantItem.complete
          ? null
          : new Date().toLocaleDateString(),
      };
      await this.updateCompleteHandler(item.id, updateFields);
      await this.updateTasksNum();
    });

    const listItemText = document.createElement("span");
    listItemText.className = "todo-item";
    listItemText.innerText = item.text;
    listItemText.addEventListener("click", async () => {
      this.alert(await this.createDetails(item.id), "info");
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
  }

  async deleteItem(elementToDelte) {
    this.deleteEffect(elementToDelte);
    await this.deleteItemHandler(elementToDelte.id);
  }

  deleteEffect(elementToDelte) {
    const container = this.listContainer;
    elementToDelte.classList.add("leave");

    const updateTasksNum = this.updateTasksNum;

    setTimeout(() => {
      container.removeChild(elementToDelte);
      updateTasksNum.call(this);
    }, 800);
  }

  async updateTasksNum() {
    this.toggleEmptyView();
    const taskList = await this.getAllItemsHandler();
    const taskNum = taskList.filter((item) => {
      return !item.complete;
    }).length;
    const footersItemsNumberSpan = document.getElementById("tasks-number");
    footersItemsNumberSpan.innerText = taskNum;
  }

  toggleEmptyView() {
    const listPlaceHolder = document.querySelector(".empty-list");
    const footer = document.querySelector("footer");

    if (this.getElementBySelector("li")) {
      listPlaceHolder.classList.add("hide");
      footer.classList.remove("hide");
    } else {
      footer.classList.add("hide");
      listPlaceHolder.classList.remove("hide");
    }
  }

  closeAlertBox() {
    this.alertBox.classList.remove("show", "warning", "info");
  }

  async createDetails(id) {
    const itemDetails = await this.getItemHandler(id);
    return `<span><span>To do:</span> ${itemDetails.text}</span>
    <span><span>Creation-date:</span> ${itemDetails.time}</span>
    ${
      itemDetails.complete
        ? `<span class="done"><span>Done at:</span> ` +
          itemDetails.checkTime +
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

  toggleLoader() {
    this.loader.classList.toggle("show");
  }
}
