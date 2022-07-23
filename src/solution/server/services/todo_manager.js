const { Item } = require("../db/models");

async function getAll() {
  const items = await Item.findAll({
    raw: true,
  });
  return items.map((item) => ({
    id: item.id,
    itemName: item.itemName,
    status: item.status,
    creationTime: item.createdAt,
  }));
}

async function addTodo(text) {
  const item = await Item.create({
    itemName: text,
    status: false,
  });
  return item;
}

async function updateTodo(id, fields) {
  const item = await Item.update({ ...fields }, { where: { id } });
  return await getTodoById(id);
}

async function getTodoById(id) {
  const item = Item.findOne({
    where: {
      id,
    },
  });
  return item;
}

async function getTodoByText(text) {
  const item = Item.findOne({
    where: {
      itemName: text,
    },
  });
  return item;
}

async function deleteTodo(id) {
  const item = await Item.destroy({
    where: {
      id,
    },
  });
  return item;
}

async function deleteAllTodo() {
  const items = await getAll();
  await Item.truncate();
  return items;
}

module.exports = {
  addTodo,
  updateTodo,
  getAll,
  getTodoById,
  getTodoByText,
  deleteTodo,
  deleteAllTodo,
};
