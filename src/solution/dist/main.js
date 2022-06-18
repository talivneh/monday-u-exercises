import View from "./View.js";
import ItemClient from "./clients/item_client.js";

class Main {
  constructor() {
    this.ItemClient = new ItemClient();
    this.view = new View(this.ItemClient);
  }

  init = async () => {
    this.view.toggleLoader();
    this.view.init();
    const addBtn = document.getElementById("add-todo");
    addBtn.addEventListener("click", () => {
      this.view.handleAddBtnClick();
    });
    const items = await this.ItemClient.getAllItems();
    await this.view.renderItems(items);
    this.view.toggleLoader();
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
