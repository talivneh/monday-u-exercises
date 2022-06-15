import { Command } from "commander";

import { consoleError, logMessage } from "./services/console-service.js";
import { validateInput } from "./services/input-validation-service.js";
import {
  addTodo,
  removeTodoByIndex,
  getAllToDos,
} from "./services/db-service.js";

const pokemonProgram = new Command();

function handleAddCommand(text) {
  const textList = text.split(",");
  if (textList.length > 1) {
    textList.forEach((text) =>
      afterValidation(validateInput(text.trim()), text)
    );
  } else {
    afterValidation(validateInput(text.trim()), text);
  }
}

function afterValidation(isValid, text) {
  if (!isValid.isExists && !isValid.isSpecial) {
    addTodo(text.trim());
  } else {
    isValid.isExists
      ? consoleError(logMessage.NOT_ADD_EXISTS)
      : consoleError(logMessage.NOT_ADD_INVALID);
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
    handleAddCommand(todoText);
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
