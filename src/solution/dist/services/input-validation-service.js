// todo: move exsits validation to server

export async function validateInput(text, getAllItems) {
  // let inValid = { isExists: false, isSpecial: false };

  // //todo- move validation to the backend
  // const itemsList = [await getAllItems()];
  // const isExists = itemsList.some(
  //   (item) => item.name === text || item.name === `Fatch ${text}`
  // );
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // if (isExists) {
  //   inValid.isExists = true;
  // } else
  if (format.test(text)) {
    return false;
  } else {
    return true;
  }
}
