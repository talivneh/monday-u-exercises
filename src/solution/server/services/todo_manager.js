const fs = require("fs").promises;
const todoFile = "./data/todo_list.json";

async function getAll() {
  const data = await readTodoFile();
  return data;
}

async function addTodo(text) {
  const data = await readTodoFile();
  let id = 1;
  if (data.length) id = data[data.length - 1].id + 1;
  const newTodo = {
    id,
    text,
    time: new Date().toLocaleDateString(),
    complete: false,
    checkTime: null,
  };
  if (!data) {
    data = [];
  }
  data.push(newTodo);
  await writeTodoFile(data);
  return newTodo;
}

async function updateTodo(todoId, fields) {
  const data = await readTodoFile();
  let itemToUpdate = data.find((item) => item.id === todoId);
  updatetItem = { ...itemToUpdate, ...fields };
  const itemsIndex = data.indexOf(itemToUpdate);
  data[itemsIndex] = updatetItem;
  await writeTodoFile(data);
  return itemToUpdate;
}

async function getTodoById(id) {
  const data = await readTodoFile();
  return data.find((value) => value.id === id);
}

async function getTodoByText(text) {
  const data = await readTodoFile();
  return data.find((value) => value.text === text);
}

async function readTodoFile() {
  try {
    const data = await fs.readFile(todoFile);
    return JSON.parse(data.toString());
  } catch (error) {
    return new Error(error);
  }
}

async function writeTodoFile(content) {
  try {
    await fs.writeFile(todoFile, JSON.stringify(content));
  } catch (error) {
    return new Error(error);
  }
}

async function deleteTodo(id) {
  const data = await getAll();
  let itemToDelete = data.find((item) => item.id === id);
  data.splice(data.indexOf(itemToDelete), 1);
  // const filteredData = data.filter((value) => value.id !== id);
  await writeTodoFile(data);
  return itemToDelete;
}

async function deleteAllTodo() {
  const data = await readTodoFile();
  await writeTodoFile([]);
  return data;
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
