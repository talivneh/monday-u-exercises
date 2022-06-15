import chalk from "chalk";

export const consoleError = (log) => {
  console.log(chalk.redBright(log));
};

export const consoleSuccess = (log) => {
  console.log(chalk.greenBright(log));
};

export const logMessage = {
  ADD: "New todo added successfully",
  NOT_ADD: "Item was not added, please try again",
  NOT_ADD_INVALID: "Item was not added, because index is invalid",
  NOT_ADD_EXISTS: "Item was not added, because its already exists",
  REMOVE: "Item was successfully removed",
  NOT_REMOVE_INVALID: "Item was not removed because index is invalid",
  NOT_REMOVE_MISSING: "index does not exsist in the list",
};
