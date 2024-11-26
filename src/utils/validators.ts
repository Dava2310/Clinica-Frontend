export const evaluatePassword = (password:string):boolean => {
  const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return regexContrasenia.test(password);
}

export const evaluateEmail = (email:string):boolean => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
}



