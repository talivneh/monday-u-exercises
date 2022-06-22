// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
export default class ItemClient {
  constructor() {
    this.ENDPOINT = `http://localhost:8080/`;
  }

  async addItem(itemText) {
    const todo = { text: itemText };
    try {
      const item = await fetch(`http://localhost:8080/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      const itemJson = await item.json();
      return itemJson;
    } catch (err) {
      console.log(err);
    }
  }

  async getItem(id) {
    try {
      const item = await fetch(`http://localhost:8080/items/${id}`);
      const itemJson = await item.json();
      return itemJson;
    } catch (err) {
      console.log(err);
    }
  }

  async updateComplete(id, fields) {
    try {
      const items = await fetch(`http://localhost:8080/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const updatedItem = await items.json();
      return updatedItem;
    } catch (err) {
      console.log(err);
    }
  }

  async removeItem(id) {
    try {
      const item = await fetch(`http://localhost:8080/items/${id}`, {
        method: "DELETE",
      });
      const deletedItem = await item.json();
      return deletedItem;
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
