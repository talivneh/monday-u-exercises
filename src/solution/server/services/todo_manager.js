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
  return data;
}

async function updateTodo(todoId, fields) {
  const data = await readTodoFile();
  const newData = data.map((item) =>
    item.id === todoId
      ? {
          ...item,
          ...fields,
        }
      : item
  );
  await writeTodoFile(newData);
  return newData;
}

async function getTodo(text) {
  const data = await readTodoFile();
  return data.find((value) => value.text === text);
}

async function readTodoFile() {
  try {
    const data = await fs.readFile(todoFile);
    return JSON.parse(data.toString());
  } catch (error) {
    // console.error(`Got an error trying to read the file: ${error.message}`);
    return new Error(error);
  }
}

async function writeTodoFile(content) {
  try {
    await fs.writeFile(todoFile, JSON.stringify(content));
  } catch (error) {
    // console.error(`Failed to write to file ${error.message}`);
    return new Error(error);
  }
}

async function deleteTodo(id) {
  const data = await getAll();
  const filterdData = data.filter((value) => value.id !== id);
  await writeTodoFile(filterdData);
  return filterdData;
}

async function deleteAllTodo() {
  await writeTodoFile([]);
  return [];
}

module.exports = {
  addTodo,
  updateTodo,
  getAll,
  getTodo,
  deleteTodo,
  deleteAllTodo,
};
