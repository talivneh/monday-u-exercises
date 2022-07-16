// const ENDPOINT = `http://localhost:8080`;

export async function addItem(itemName) {
  const todo = { text: itemName };
  try {
    const item = await fetch(`/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const itemJson = await item.json();
    return itemJson;
  } catch (err) {
    return { errMessage: err };
  }
}

export async function getItem({ id }) {
  try {
    const item = await fetch(`/items/${id}`);
    const itemJson = await item.json();
    return itemJson;
  } catch (err) {
    return { errMessage: err };
  }
}

export async function updateStatus({ id }, fields) {
  console.log(id);
  try {
    const items = await fetch(`/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const updatedItem = await items.json();
    return updatedItem;
  } catch (err) {
    return { errMessage: err };
  }
}

export async function removeItem({ id }) {
  try {
    const item = await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    const deletedItem = await item.json();
    return deletedItem;
  } catch (err) {
    return { errMessage: err };
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
    return { errMessage: err };
  }
}

export async function getAllItems() {
  try {
    const items = await fetch(`/items`);
    const itemsJson = await items.json();
    return itemsJson;
  } catch (err) {
    return { errMessage: err };
  }
}
