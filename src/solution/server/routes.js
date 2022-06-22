const express = require("express");
const {
  createTodo,
  updateTodo,
  getAll,
  deleteTodo,
  getTodo,
  deleteAllTodo,
} = require("./controllers/todoController");

const todoRouter = express.Router();

//todo: add validation middlewear

//add
todoRouter.post("/items", createTodo);
//get one
todoRouter.get("/items/:id", getTodo);
//update
todoRouter.put("/items/:id", updateTodo);
//get all
todoRouter.get("/items", getAll);
//delete one
todoRouter.delete("/items/:id", deleteTodo);
//delete all
todoRouter.delete("/items", deleteAllTodo);

module.exports = todoRouter;
