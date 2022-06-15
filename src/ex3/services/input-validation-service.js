import { getAllToDos } from "./db-service.js";

export function validateInput(text) {
  let inValid = { isExists: false, isSpecial: false };

  const itemsList = [getAllToDos()];
  const isExists = itemsList.some((item) => item.split("\n")[0] === text);
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (isExists) {
    inValid.isExists = true;
  } else if (format.test(text)) {
    inValid.isSpecial = true;
  } else {
    return true;
  }
  return inValid;
}
