import fs from "fs";
import { consoleSuccess, consoleError, logMessage } from "./console-service.js";
import fetchPokemon from "../PokemonClient.js";

const path = "././todoApp.txt";

export async function addTodo(text) {
  let textToAdd;
  try {
    const pokemon = await fetchPokemon(text);
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

export function removeTodoByIndex(index) {
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

export function getAllToDos() {
  const todos = fs.readFileSync(path, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
  return todos;
}
