import View from "./View.js";
import ItemManager from "./ItemManager.js";

class Main {
  constructor() {
    this.view = new View();
    this.itemManager = new ItemManager();
  }

  init() {
    this.view.init();
    const addBtn = document.getElementById("add-todo");
    addBtn.addEventListener("click", () => {
      this.view.handleAddBtnClick(
        this.itemManager.addItem.bind(this.itemManager)
      );
    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
