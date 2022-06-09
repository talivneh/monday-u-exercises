import { Command } from "commander";
import fetch from "node-fetch";
import fs from "fs";

const pokemonProgram = new Command();

async function addTodo(text) {
  const path = "./todoApp.txt";
  let textToAdd;
  try {
    const pokemon = await getPokemon(text);
    if (pokemon && pokemon.name) {
      textToAdd = `Catch ${pokemon.name}\n`;
    } else {
      textToAdd = `${text}\n`;
    }
    fs.appendFileSync(path, textToAdd);
    console.log("New todo added successfully");
  } catch {
    (err) => {
      console.log(err);
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
      return err;
    };
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
  // .option("-c, --color <string>", "Result color", "green")
  .action((todoText) => {
    addTodo(todoText);
  });

pokemonProgram
  .command("remove")
  .description("Remove todo from the ToDo list")
  .argument("<string>", "todo text")
  // .option("-c, --color <string>", "Result color", "green")
  .action((todoText) => {
    itemManager.removeItem({ text: todoText }).then((resault) => {
      console.log(
        // chalk[options.color](
        `${resault} was removed successfully`
        // )
      );
    });
  });

pokemonProgram
  .command("get")
  .description("Get all ToDos from the list")
  // .option("-c, --color <string>", "Result color", "green")
  .action(() => {
    console.log(
      // chalk[options.color](
      itemManager.getAllItems()
      // )
    );
  });

pokemonProgram.parse();
