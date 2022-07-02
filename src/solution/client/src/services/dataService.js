const ENDPOINT = `http://localhost:8080`;

export async function addItem(itemText) {
  const todo = { text: itemText };
  try {
    const item = await fetch(`/items`, {
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

export async function getItem(id) {
  try {
    const item = await fetch(`/items/${id}`);
    const itemJson = await item.json();
    return itemJson;
  } catch (err) {
    console.log(err);
  }
}

export async function updateStatus(id, fields) {
  try {
    const items = await fetch(`/items/${id}`, {
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

export async function removeItem(id) {
  try {
    const item = await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    const deletedItem = await item.json();
    return deletedItem;
  } catch (err) {
    console.log(err);
  }
}

export async function removeAllItems() {
  try {
    const items = await fetch(`/items`, {
      method: "DELETE",
    });
    const itemsJson = await items.json();
    return itemsJson;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllItems() {
  try {
    const items = await fetch(`/items`);
    const itemsJson = await items.json();
    return itemsJson;
  } catch (err) {
    console.log(err);
  }
}
