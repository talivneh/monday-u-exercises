// Define your endpoints here (this is your "controller file")
const todoService = require("../services/todo_manager.js");
const { fetchPokemon } = require("../clients/pokemon_client.js");

//doesnt work
async function createTodo(req, res) {
  let newTodo = req.body.text;
  const newPokemonItem = await fetchPokemon(newTodo);
  if (newPokemonItem && newPokemonItem.name) {
    const catchPokemon = `Catch ${newPokemonItem.name}`;
    newTodo = catchPokemon;
  }
  const isExists = await todoService.getTodo(newTodo);
  if (isExists)
    return res.status(400).json({
      status: 400,
      error: "todo allready exists",
    });
  const newAddedTodo = await todoService.addTodo(newTodo);
  res.status(200).json(newAddedTodo);
}

async function getTodo(req, res) {
  let todoId = Number.parseInt(req.params.id);
  //fix error handling
  if (isNaN(todoId))
    return res.status(400).json({
      status: 400,
      error: "wrong parameters",
    });

  const todo = await todoService.getTodo(todoId);

  if (!todo) {
    //fix error handling
    return res.status(404).json({
      status: 404,
      error: "Not found",
    });
  }

  res.status(200).json(todo);
}

async function updateTodo(req, res) {
  let todoId = Number.parseInt(req.params.id);
  //fix error handling
  if (isNaN(todoId))
    return res.status(400).json({
      status: 400,
      error: "wrong parameters",
    });
  let fieldToUpdate = req.body;
  //fix error handling
  if (!fieldToUpdate)
    return res.status(400).json({
      status: 400,
      error: "wrong parameters",
    });

  const todoList = await todoService.updateTodo(todoId, fieldToUpdate);

  if (!todoList) {
    //fix error handling
    return res.status(404).json({
      status: 404,
      error: "Not found",
    });
  }

  res.status(200).json(todoList);
}

async function getAll(req, res) {
  let data = await todoService.getAll();
  if (!data) data = [];
  res.status(200).json(data);
}

async function deleteTodo(req, res) {
  let todoId = Number.parseInt(req.params.id);
  //fix error handling
  if (isNaN(todoId))
    return res.status(400).json({
      status: 400,
      error: "wrong parameters",
    });

  const data = await todoService.deleteTodo(todoId);
  res.status(200).json(data);
}

async function deleteAllTodo(req, res) {
  const data = await todoService.deleteAllTodo();
  res.status(200).json(data);
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getAll,
  getTodo,
  deleteAllTodo,
};
