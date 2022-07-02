export default async function validateInput(text) {
  const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(text)) {
    return false;
  } else {
    return true;
  }
}
