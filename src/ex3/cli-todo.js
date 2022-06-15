import { Command } from "commander";
import fetch from "node-fetch";
import fs from "fs";

import { consoleSuccess, consoleError, logMessage } from "./console-service";

const pokemonProgram = new Command();
const path = "./todoApp.txt";

async function addTodo(text) {
  let textToAdd;
  try {
    const pokemon = await getPokemon(text);
    if (pokemon && pokemon.name) {
      textToAdd = `Catch ${pokemon.name}\n`;
    } else {
      textToAdd = `${text}\n`;
    }
    fs.appendFileSync(path, textToAdd);
    consoleSuccess(logMessage.ADD);
  } catch {
    (err) => {
      consoleError(logMessage.NOT_ADD);
      throw err;
    };
  }
}

async function getPokemon(text) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`);
    const json = await response.json();
    return json;
  } catch {
    (err) => {
      throw err;
    };
  }
}

function getAllToDos() {
  const todos = fs.readFileSync(path, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
  return todos;
}

function removeTodoByIndex(index) {
  const todos = getAllToDos();
  const newTodoList = todos.split("\n");
  if (newTodoList[index]) {
    newTodoList.splice(index, 1);
    fs.writeFileSync(path, newTodoList.join("\n"));
    consoleSuccess(logMessage.REMOVE);
  } else {
    if (isNaN(Number(index))) {
      consoleError(logMessage.NOT_REMOVE_INVALID);
    } else {
      consoleError(logMessage.NOT_REMOVE_MISSING);
    }
  }
}

pokemonProgram
  .name("todo-app")
  .description("Read/Write/Delete todos using CLI")
  .version("1.0.0");

pokemonProgram
  .command("add")
  .description("Add todo to the ToDo list")
  .argument("<string>", "todo text")
  .action((todoText) => {
    addTodo(todoText);
  });

pokemonProgram
  .command("remove")
  .description("Remove todo from the ToDo list")
  .argument("<number>", "item index number")
  .action((index) => {
    removeTodoByIndex(index);
  });

pokemonProgram
  .command("get")
  .description("Get all ToDos from the list")
  .action(() => {
    const allTodos = getAllToDos();
    console.log(allTodos);
  });

pokemonProgram.parse();
