// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
export default class ItemClient {
  constructor() {
    this.ENDPOINT = `http://localhost:8080/`;
  }

  async addItem(itemText) {
    const todo = { text: itemText };
    try {
      const items = await fetch(`http://localhost:8080/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      const itemsJson = await items.json();
      return itemsJson;
    } catch (err) {
      console.log(err);
    }
  }

  async updateComplete(todo) {
    const updateFields = {
      complete: !todo.complete,
      checkTime: todo.complete ? null : new Date().toLocaleDateString(),
    };

    try {
      const items = await fetch(`http://localhost:8080/items/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFields),
      });
      const itemsJson = await items.json();
      return itemsJson;
    } catch (err) {
      console.log(err);
    }
  }

  async removeItem(id) {
    try {
      const items = await fetch(`http://localhost:8080/items/${id}`, {
        method: "DELETE",
      });
      const itemsJson = await items.json();
      return itemsJson;
    } catch (err) {
      console.log(err);
    }
  }

  async removeAllItems() {
    try {
      const items = await fetch(`http://localhost:8080/items`, {
        method: "DELETE",
      });
      const itemsJson = await items.json();
      return itemsJson;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllItems() {
    try {
      const items = await fetch(`http://localhost:8080/items`);
      const itemsJson = await items.json();
      return itemsJson;
    } catch (err) {
      console.log(err);
    }
  }
}
